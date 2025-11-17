import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getArtisans, getCategories } from "../services/api";
import Seo from "../components/Seo";

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const activeCategoryId = searchParams.get("categorie") || "";

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setHasError(false);

        const [artisansData, categoriesData] = await Promise.all([
          getArtisans(),
          getCategories(),
        ]);

        setArtisans(Array.isArray(artisansData) ? artisansData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error("Erreur chargement artisans / catégories :", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const activeCategoryName = useMemo(() => {
    if (!activeCategoryId || !Array.isArray(categories)) return "";
    const cat = categories.find(
      (c) =>
        String(c.id_categorie ?? c.id) === String(activeCategoryId)
    );
    return cat?.nom_categorie ?? "";
  }, [activeCategoryId, categories]);

  const handleResetCategory = () => {
    const params = new URLSearchParams(location.search);
    params.delete("categorie");
    navigate({
      pathname: "/artisans",
      search: params.toString() ? `?${params.toString()}` : "",
    });
  };

  const renderStars = (noteRaw) => {
    const value = parseFloat(noteRaw);
    if (Number.isNaN(value) || value <= 0) {
      return {
        stars: "☆☆☆☆☆",
        label: "Note non renseignée",
      };
    }

    const capped = Math.max(0, Math.min(5, value));
    const full = Math.round(capped);
    const stars = "★".repeat(full) + "☆".repeat(5 - full);

    return {
      stars,
      label: `${capped.toFixed(1).replace(".", ",")}/5`,
    };
  };

  const filteredArtisans = useMemo(() => {
    let list = Array.isArray(artisans) ? artisans : [];

    if (activeCategoryId) {
      list = list.filter((a) => {
        const idCategorie =
          a.id_categorie ??
          a.categorie_id ??
          a?.Categorie?.id_categorie ??
          a?.Specialite?.id_categorie ??
          a?.Specialite?.Categorie?.id_categorie ??
          null;

        return (
          idCategorie &&
          String(idCategorie) === String(activeCategoryId)
        );
      });
    }

    const term = searchTerm.trim().toLowerCase();
    if (!term) return list;

    return list.filter((a) => {
      const nomEntreprise = (a.nom_entreprise || "").toLowerCase();
      const fullName = `${a.prenom ?? ""} ${a.nom ?? ""}`
        .trim()
        .toLowerCase();
      const ville = (a.ville || "").toLowerCase();

      return (
        nomEntreprise.includes(term) ||
        fullName.includes(term) ||
        ville.includes(term)
      );
    });
  }, [artisans, activeCategoryId, searchTerm]);

  const renderArtisanCard = (artisanRaw, index) => {
    const artisan = artisanRaw || {};
    const id = artisan.id_artisan ?? artisan.id ?? index;

    const entreprise =
      artisan.nom_entreprise ??
      (artisan.prenom || artisan.nom
        ? `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim()
        : "Artisan");

    const ville = artisan.ville ?? "";

    const rawSpecialite =
      artisan.nom_specialite ??
      artisan?.Specialite?.nom_specialite ??
      artisan.specialite ??
      "";

    let specialite = "";
    if (typeof rawSpecialite === "string") {
      specialite = rawSpecialite;
    } else if (rawSpecialite && typeof rawSpecialite === "object") {
      specialite =
        rawSpecialite.nom_specialite ?? rawSpecialite.name ?? "";
    }

    const { stars, label } = renderStars(artisan.note);

    return (
      <div className="col-12 col-md-6 col-lg-4 mb-4" key={id}>
        <div className="artisans-card h-100 d-flex flex-column justify-content-between">
          <div>
            <h3 className="artisans-card-name mb-2">{entreprise}</h3>

            <div className="artisans-card-stars mb-1" aria-hidden="true">
              {stars}
            </div>
            <div className="mb-2" aria-label={`Note de l'artisan : ${label}`}>
              {label}
            </div>

            {specialite && (
              <p className="artisans-card-specialite mb-1">
                {specialite}
              </p>
            )}

            {ville && (
              <p className="artisans-card-ville mb-3">{ville}</p>
            )}
          </div>

          <div>
            <Link
              to={`/artisans/${artisan.id_artisan ?? artisan.id ?? ""}`}
              className="btn artisans-card-btn"
            >
              Voir la fiche
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="artisans-page">
      <Seo
        title="Artisans — Trouve ton artisan"
        description="Consultez la liste des artisans de la région Auvergne-Rhône-Alpes, filtrez par catégorie ou métier et accédez aux fiches détaillées de chaque professionnel."
      />
      <div className="container">
        <header className="artisans-header">
          <div>
            <h1 className="artisans-title">Artisans</h1>
            <p className="artisans-subtitle">
              {activeCategoryName
                ? `Catégorie : ${activeCategoryName}`
                : "Tous les artisans référencés dans la région."}
            </p>
          </div>

          <div className="artisans-actions">
            {activeCategoryName && (
              <button
                type="button"
                className="btn artisans-reset-btn"
                onClick={handleResetCategory}
              >
                Afficher toutes les catégories
              </button>
            )}

            <div className="artisans-search">
              <input
                type="search"
                className="form-control artisans-search-input"
                placeholder="Rechercher par nom ou ville…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        {loading && <p>Chargement des artisans…</p>}

        {hasError && (
          <p className="text-danger">
            Impossible de charger la liste des artisans pour le moment.
          </p>
        )}

        {!loading && !hasError && (
          <>
            {filteredArtisans.length === 0 ? (
              <p>
                Aucun artisan trouvé
                {activeCategoryName
                  ? ` pour la catégorie « ${activeCategoryName} »`
                  : ""}
                .
              </p>
            ) : (
              <div className="row">
                {filteredArtisans.map((a, index) =>
                  renderArtisanCard(a, index)
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}