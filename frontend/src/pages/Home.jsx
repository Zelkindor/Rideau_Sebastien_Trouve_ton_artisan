import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArtisans } from "../services/api";
import Seo from "../components/Seo";

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadArtisans() {
      try {
        setLoading(true);
        setHasError(false);

        // On commence par demander à l’API uniquement les artisans "top"
        const topsFromApi = await getArtisans({ top: 1, limit: 3 });
        let finalList = Array.isArray(topsFromApi) ? [...topsFromApi] : [];

        // Si on a moins de 3 artisans top, on complète avec d'autres artisans
        if (finalList.length < 3) {
          const othersFromApi = await getArtisans({ limit: 3 });

          const others = Array.isArray(othersFromApi) ? othersFromApi : [];

          const getId = (a) => a?.id_artisan ?? a?.id;

          // On enlève ceux déjà présents dans la liste top
          const remaining = others.filter(
            (a) => !finalList.some((t) => getId(t) === getId(a))
          );

          finalList = finalList.concat(
            remaining.slice(0, 3 - finalList.length)
          );
        }

        // On s'assure de n'afficher que 3 artisans max
        setArtisans(finalList.slice(0, 3));
      } catch (error) {
        console.error("Erreur chargement artisans du mois :", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadArtisans();
  }, []);

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

  const renderArtisanCard = (artisanRaw, index) => {
    const artisan = artisanRaw || {};
    const id = artisan.id_artisan ?? artisan.id ?? index;

    const entreprise =
      artisan.nom_entreprise ??
      (artisan.prenom || artisan.nom
        ? `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim()
        : "Artisan");

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
        rawSpecialite.nom_specialite ??
        rawSpecialite.name ??
        "";
    }

    const city = artisan.ville ?? "";

    const { stars, label } = renderStars(artisan.note);

    return (
      <div className="col-12 col-md-4 mb-4" key={id}>
        <div className="home-artisan-card h-100 d-flex flex-column justify-content-center text-center">
          <div className="home-artisan-name mb-3">{entreprise}</div>

          <div className="home-artisan-stars mb-1" aria-hidden="true">
            {stars}
          </div>
          <div className="mb-3" aria-label={`Note de l'artisan : ${label}`}>
            {label}
          </div>

          {specialite && (
            <div className="home-artisan-specialite mb-2">
              {specialite}
            </div>
          )}

          {city && (
            <div className="home-artisan-ville mb-4">{city}</div>
          )}

          <div>
            <Link
              className="btn home-artisan-btn"
              to={`/artisans/${artisan.id_artisan ?? artisan.id ?? ""}`}
            >
              Voir la fiche
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home-page">
      <Seo
        title="Trouve ton artisan — Accueil"
        description="Trouvez facilement un artisan de confiance en Auvergne-Rhône-Alpes : découvrez les artisans du mois, filtrez par métier et contactez-les en quelques clics."
      />
      <section className="home-how">
        <div className="container text-center">
          <h1 className="home-how-title mb-5">
            Comment trouver mon artisan ?
          </h1>

          <div className="row home-how-steps gy-4">
            <div className="col-6 col-md-3">
              <p className="home-how-step">
                <span className="home-how-step-number">1.</span>{" "}
                Choisir la catégorie d’artisanat dans le menu.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <p className="home-how-step">
                <span className="home-how-step-number">2.</span>{" "}
                Choisir un artisan.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <p className="home-how-step">
                <span className="home-how-step-number">3.</span>{" "}
                Le contacter via le formulaire de contact.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <p className="home-how-step">
                <span className="home-how-step-number">4.</span>{" "}
                Une réponse sera apportée sous 48h.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-featured">
        <div className="container">
          <div className="text-center mb-5">
            <div className="home-section-divider" />
            <h2 className="home-section-title mt-3">Artisans du mois</h2>
          </div>

          {loading && <p className="text-center">Chargement…</p>}

          {hasError && (
            <p className="text-danger text-center">
              Impossible de charger les artisans du mois pour le moment.
            </p>
          )}

          {!loading && !hasError && (
            <>
              {Array.isArray(artisans) && artisans.length === 0 && (
                <p className="text-center">
                  Aucun artisan disponible pour le moment.
                </p>
              )}

              <div className="row justify-content-center">
                {Array.isArray(artisans) &&
                  artisans.map((a, index) => renderArtisanCard(a, index))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}