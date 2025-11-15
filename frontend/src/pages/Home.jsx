// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArtisans } from "../services/api";

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadArtisans() {
      try {
        setLoading(true);
        setHasError(false);

        const data = await getArtisans();

        let list = Array.isArray(data) ? data : [];

        // On regarde si certains artisans ont un champ "top"
        const tops = list.filter(
          (a) => a?.top === true || a?.top === 1 || a?.top === "1"
        );

        if (tops.length > 0) {
          list = tops;
        }

        // On limite à 3 artisans
        setArtisans(list.slice(0, 3));
      } catch (error) {
        console.error("Erreur chargement artisans du mois :", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadArtisans();
  }, []);

  const renderArtisanCard = (artisanRaw, index) => {
    const artisan = artisanRaw || {};

    const id = artisan.id_artisan ?? artisan.id ?? index;

    // -------- CATÉGORIE : on gère le cas où c'est un objet --------
    const rawCategory =
      artisan.nom_categorie ??
      artisan?.Categorie?.nom_categorie ??
      artisan.categorie ??
      "";

    let category = "";

    if (typeof rawCategory === "string") {
      category = rawCategory;
    } else if (rawCategory && typeof rawCategory === "object") {
      // Cas typique : { id_categorie, nom_categorie }
      category =
        rawCategory.nom_categorie ??
        rawCategory.name ??
        "";
    }

    const entreprise = artisan.nom_entreprise ?? artisan.nom ?? "Artisan";

    const city = artisan.ville ?? "";

    const rawDescription =
      artisan.a_propos ??
      artisan.description ??
      "";

    const description = String(rawDescription);
    const shortDescription =
      description.length > 140
        ? description.slice(0, 140) + "…"
        : description;

    return (
      <div className="col-md-4" key={id}>
        <div className="home-artisan-card p-4 h-100">
          {category && (
            <p className="home-artisan-category mb-2">
              {category}
            </p>
          )}

          <h3 className="h5 mb-1">{entreprise}</h3>

          {city && (
            <p className="home-artisan-city mb-2">
              {city}
            </p>
          )}

          {shortDescription && (
            <p className="home-artisan-desc mb-3">
              {shortDescription}
            </p>
          )}

          <Link
            className="btn btn-primary btn-sm"
            to={`/artisans/${artisan.id_artisan ?? artisan.id ?? ""}`}
          >
            Voir la fiche
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* ---------- HERO ---------- */}
      <section className="home-hero py-5">
        <div className="container">
          <h1 className="home-hero-title mb-3">
            Trouve un artisan près de chez toi
          </h1>
          <p className="home-hero-subtitle mb-4">
            Compare les profils, filtre par spécialité et contacte rapidement
            un artisan pour tes travaux.
          </p>
          <div className="d-flex gap-3">
            <Link to="/artisans" className="btn btn-primary btn-lg">
              Voir les artisans
            </Link>
            <a href="#artisans-du-mois" className="btn btn-outline-secondary">
              Artisans du mois
            </a>
          </div>
        </div>
      </section>

      {/* ---------- ETAPES ---------- */}
      <section className="home-how py-5">
        <div className="container">
          <h2 className="home-section-title mb-4">
            Comment ça fonctionne ?
          </h2>

          <div className="row gy-4">
            <div className="col-md-4">
              <div className="home-step-card p-4 h-100">
                <h3 className="h5 mb-2">1. Cherche un artisan</h3>
                <p>
                  Filtre par catégorie, spécialité ou ville pour trouver un artisan proche.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-step-card p-4 h-100">
                <h3 className="h5 mb-2">2. Compare les profils</h3>
                <p>
                  Consulte la fiche complète : description, ville, spécialité, coordonnées.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-step-card p-4 h-100">
                <h3 className="h5 mb-2">3. Contacte directement</h3>
                <p>
                  Utilise le formulaire de contact intégré pour joindre l’artisan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ARTISANS DU MOIS ---------- */}
      <section id="artisans-du-mois" className="home-featured py-5">
        <div className="container">
          <h2 className="home-section-title mb-4">Artisans du mois</h2>

          {loading && <p>Chargement…</p>}
          {hasError && (
            <p className="text-danger">
              Impossible de charger les artisans du mois pour le moment.
            </p>
          )}

          {!loading && !hasError && (
            <>
              {Array.isArray(artisans) && artisans.length === 0 && (
                <p>Aucun artisan disponible.</p>
              )}

              <div className="row gy-4">
                {Array.isArray(artisans) &&
                  artisans.map((a, index) => renderArtisanCard(a, index))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="home-cta py-5">
        <div className="container text-center">
          <h2 className="home-cta-title mb-3">
            Besoin d’un professionnel rapidement ?
          </h2>
          <Link to="/artisans" className="btn btn-light btn-lg">
            Parcourir les artisans
          </Link>
        </div>
      </section>
    </div>
  );
}