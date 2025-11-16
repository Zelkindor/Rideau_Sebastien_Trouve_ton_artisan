// src/pages/ArtisanDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtisanById } from "../services/api";

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

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    document.title = "Artisan — Trouve ton artisan";
  }, []);

  useEffect(() => {
    async function loadArtisan() {
      try {
        setLoading(true);
        setHasError(false);

        const data = await getArtisanById(id);
        setArtisan(data || null);
      } catch (error) {
        console.error("Erreur chargement artisan :", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadArtisan();
  }, [id]);

  if (loading) {
    return (
      <main className="artisan-page container py-5">
        <p>Chargement de la fiche artisan…</p>
      </main>
    );
  }

  if (hasError || !artisan) {
    return (
      <main className="artisan-page container py-5">
        <p className="text-danger">
          Impossible de charger la fiche de cet artisan.
        </p>
        <Link to="/artisans" className="btn artisan-back-btn">
          Retour à la liste des artisans
        </Link>
      </main>
    );
  }

  const entreprise =
    artisan.nom_entreprise ??
    (artisan.prenom || artisan.nom
      ? `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim()
      : "Artisan");

  const ville = artisan.ville ?? "";
  const adresse = artisan.adresse ?? "";
  const email = artisan.email ?? "";
  const telephone = artisan.telephone ?? artisan.tel ?? "";
  const description =
    artisan.description ??
    artisan.presentation ??
    "Cet artisan n’a pas encore renseigné de description.";

  const rawSpecialite =
    artisan.nom_specialite ??
    artisan?.Specialite?.nom_specialite ??
    artisan.specialite ??
    "";
  const { stars, label: noteLabel } = renderStars(artisan.note);
  const rawCategorie =
  artisan?.Specialite?.Categorie?.nom_categorie ??
  artisan.nom_categorie ??
  "";

  let specialite = "";
  if (typeof rawSpecialite === "string") {
    specialite = rawSpecialite;
  } else if (rawSpecialite && typeof rawSpecialite === "object") {
    specialite =
      rawSpecialite.nom_specialite ?? rawSpecialite.name ?? "";
  }

  return (
    <main className="artisan-page">
      <div className="container">
        <header className="artisan-header mb-4">
          <div>
            <h1 className="artisan-title">{entreprise}</h1>
            {specialite && (
              <p className="artisan-specialite">
                {specialite}
              </p>
            )}
            {rawCategorie && (
              <p className="artisan-categorie">
                Catégorie : {rawCategorie}
              </p>
            )}
            {ville && (
              <p className="artisan-ville">
                {ville}
              </p>
            )}
            <p className="artisan-note" aria-label={`Note de l'artisan : ${noteLabel}`}>
              <span className="artisan-note-stars">{stars}</span>{" "}
              <span className="artisan-note-label">{noteLabel}</span>
            </p>
          </div>

          <div className="artisan-header-actions">
            <Link to="/artisans" className="btn artisan-back-btn">
              ← Retour à la liste
            </Link>
          </div>
        </header>

        <section className="artisan-layout">
          <div className="artisan-main">
            <h2 className="artisan-section-title">
              À propos de cet artisan
            </h2>
            <p className="artisan-description">
              {description}
            </p>
          </div>

          <aside className="artisan-aside">
            <div className="artisan-contact-card">
              <h2 className="artisan-section-title">
                Coordonnées
              </h2>

              {adresse && (
                <p className="artisan-contact-line">
                  {adresse}
                  {ville ? <><br />{ville}</> : null}
                </p>
              )}

              {!adresse && ville && (
                <p className="artisan-contact-line">
                  {ville}
                </p>
              )}

              {telephone && (
                <p className="artisan-contact-line">
                  <span className="artisan-contact-label">
                    Téléphone :
                  </span>{" "}
                  <a href={`tel:${telephone}`}>{telephone}</a>
                </p>
              )}

              {email && (
                <p className="artisan-contact-line">
                  <span className="artisan-contact-label">
                    Email :
                  </span>{" "}
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              )}

              <Link
                to={`/contact?artisan=${artisan.id_artisan ?? artisan.id ?? ""}`}
                className="btn artisan-contact-btn mt-3"
              >
                Contacter cet artisan
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}