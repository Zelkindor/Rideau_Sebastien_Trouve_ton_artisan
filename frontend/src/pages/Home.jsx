// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArtisans } from "../services/api";

function HeroSection() {
  return (
    <section className="home-hero py-5">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <p className="home-hero-badge mb-3">
              Trouve un artisan près de chez toi
            </p>
            <h1 className="home-hero-title mb-3">
              Des artisans de confiance
              <br />
              pour tous tes travaux.
            </h1>
            <p className="home-hero-subtitle mb-4">
              Rénovation, dépannage, entretien : explore les profils,
              filtre par spécialité et contacte directement l’artisan qui
              correspond à ton projet.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/artisans"
                className="btn btn-primary btn-lg home-hero-cta"
              >
                Trouver un artisan
              </Link>
              <a href="#artisans-du-mois" className="btn btn-outline-secondary">
                Voir les artisans du mois
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="home-hero-card shadow-sm p-4">
              <h2 className="h5 mb-3">Besoin d’un coup de main ?</h2>
              <ul className="home-hero-list list-unstyled mb-0">
                <li>• Profils détaillés et clairs</li>
                <li>• Spécialités variées : plomberie, électricité, etc.</li>
                <li>• Contact gratuit et sans engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Cherche un artisan",
      text: "Filtre par catégorie, spécialité ou ville pour trouver les artisans proches de toi."
    },
    {
      id: 2,
      title: "Compare les profils",
      text: "Consulte la fiche de chaque artisan : description, zone d’intervention, coordonnées."
    },
    {
      id: 3,
      title: "Contacte directement",
      text: "Envoie un message depuis la page Contact ou appelle l’artisan si ses coordonnées sont affichées."
    }
  ];

  return (
    <section className="home-how-it-works py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-8">
            <h2 className="home-section-title mb-2">
              Comment fonctionne « Trouve ton artisan » ?
            </h2>
            <p className="home-section-subtitle mb-0">
              Un parcours simple en trois étapes pour t’aider à trouver le bon
              professionnel.
            </p>
          </div>
        </div>

        <div className="row gy-4">
          {steps.map((step) => (
            <div className="col-md-4" key={step.id}>
              <div className="home-step-card h-100 p-4">
                <p className="home-step-number mb-2">{step.id}</p>
                <h3 className="h5 mb-2">{step.title}</h3>
                <p className="mb-0">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedArtisansSection() {
  const [artisans, setArtisans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadFeaturedArtisans() {
      try {
        setIsLoading(true);
        setHasError(false);

        // On réutilise l’API existante
        const allArtisans = await getArtisans();

        let featured = allArtisans || [];

        // Si le champ `top` existe, on l’utilise pour filtrer
        const withTop = featured.filter(
          (artisan) =>
            artisan.top === true ||
            artisan.top === 1 ||
            artisan.top === "1"
        );

        if (withTop.length > 0) {
          featured = withTop;
        }

        // On limite à 3 artisans du mois
        setArtisans(featured.slice(0, 3));
      } catch (error) {
        console.error("Erreur chargement artisans du mois :", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedArtisans();
  }, []);

  return (
    <section
      className="home-featured-artisans py-5"
      id="artisans-du-mois"
    >
      <div className="container">
        <div className="row mb-4 align-items-end">
          <div className="col-lg-8">
            <h2 className="home-section-title mb-2">Artisans du mois</h2>
            <p className="home-section-subtitle mb-0">
              Une sélection d’artisans mis en avant ce mois-ci. Découvre leurs
              spécialités et contacte-les facilement.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <Link to="/artisans" className="btn btn-outline-primary">
              Voir tous les artisans
            </Link>
          </div>
        </div>

        {isLoading && <p>Chargement des artisans du mois…</p>}
        {hasError && (
          <p className="text-danger">
            Impossible de charger les artisans du mois pour le moment.
          </p>
        )}

        {!isLoading && !hasError && artisans.length === 0 && (
          <p>Aucun artisan à afficher pour le moment.</p>
        )}

        {!isLoading && !hasError && artisans.length > 0 && (
          <div className="row gy-4">
            {artisans.map((artisan) => {
              const description =
                artisan.a_propos ||
                artisan.description ||
                "";

              const shortDescription =
                description.length > 140
                  ? `${description.slice(0, 140)}…`
                  : description;

              const speciality =
                artisan.nom_specialite ||
                artisan.specialite ||
                artisan?.Specialite?.nom_specialite ||
                "";

              const category =
                artisan.nom_categorie ||
                artisan.categorie ||
                artisan?.Categorie?.nom_categorie ||
                "";

              return (
                <div className="col-md-4" key={artisan.id_artisan || artisan.id}>
                  <article className="home-artisan-card h-100 p-4">
                    {category && (
                      <p className="home-artisan-category mb-2">
                        {category}
                      </p>
                    )}

                    <h3 className="h5 mb-1">
                      {artisan.nom_entreprise || artisan.nom}
                    </h3>

                    {speciality && (
                      <p className="home-artisan-speciality mb-1">
                        {speciality}
                      </p>
                    )}

                    {artisan.ville && (
                      <p className="home-artisan-city mb-2">
                        {artisan.ville}
                      </p>
                    )}

                    {artisan.note && (
                      <p className="home-artisan-note mb-2">
                        Note : {artisan.note}/5
                      </p>
                    )}

                    {shortDescription && (
                      <p className="home-artisan-description mb-3">
                        {shortDescription}
                      </p>
                    )}

                    <Link
                      to={`/artisans/${artisan.id_artisan || artisan.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Voir la fiche
                    </Link>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function GuaranteesSection() {
  const guarantees = [
    {
      id: 1,
      title: "Des profils complets",
      text: "Chaque artisan dispose d’une fiche détaillée avec sa spécialité, sa ville et ses informations de contact."
    },
    {
      id: 2,
      title: "Une recherche ciblée",
      text: "Filtre par catégorie et spécialité pour gagner du temps dans ta recherche."
    },
    {
      id: 3,
      title: "Une mise en relation simple",
      text: "Tu contactes directement l’artisan, sans intermédiaire, depuis la plateforme."
    }
  ];

  return (
    <section className="home-guarantees py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-8">
            <h2 className="home-section-title mb-2">
              Pourquoi utiliser « Trouve ton artisan » ?
            </h2>
            <p className="home-section-subtitle mb-0">
              Une plateforme pensée pour simplifier la mise en relation entre
              particuliers et artisans.
            </p>
          </div>
        </div>

        <div className="row gy-4">
          {guarantees.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="home-guarantee-card h-100 p-4">
                <h3 className="h5 mb-2">{item.title}</h3>
                <p className="mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="home-cta py-5">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-lg-8">
            <h2 className="home-cta-title mb-2">
              Prêt à lancer ton projet avec un artisan de confiance ?
            </h2>
            <p className="home-cta-subtitle mb-0">
              Parcours la liste des artisans ou envoie un message depuis la page
              Contact.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <div className="d-flex flex-lg-row flex-column gap-3 justify-content-lg-end">
              <Link to="/artisans" className="btn btn-light">
                Voir les artisans
              </Link>
              <Link to="/contact" className="btn btn-outline-light">
                Contacter un artisan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <HowItWorksSection />
      <FeaturedArtisansSection />
      <GuaranteesSection />
      <CallToActionSection />
    </div>
  );
}