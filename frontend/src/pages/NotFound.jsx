// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import image404 from "../assets/image_404.png";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <main className="notfound-page container py-5 text-center">
      <Seo
        title="Page introuvable — Trouve ton artisan"
        description="La page que vous cherchez est introuvable sur le site Trouve ton artisan. Revenez à la page d'accueil pour découvrir les artisans de la région Auvergne-Rhône-Alpes."
      />
      <div className="mb-4">
        <img
          src={image404}
          alt="Page introuvable"
          className="notfound-illustration mb-3"
          style={{ maxWidth: "320px", width: "100%", height: "auto" }}
        />
      </div>

      <h1 className="mb-3">Page non trouvée</h1>
      <p className="mb-4">
        La page que vous avez demandée n&apos;existe pas ou n&apos;est plus
        disponible.
      </p>

      <p className="mb-4">
        Vous pouvez revenir à la page d&apos;accueil pour retrouver les artisans
        de la région Auvergne-Rhône-Alpes.
      </p>

      <Link to="/" className="btn notfound-btn">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}