// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function NotFound() {
  return (
    <main className="notfound-page container py-5 text-center">
      <div className="mb-4">
        <img
          src={logo}
          alt="Trouve ton artisan"
          className="notfound-logo mb-3"
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