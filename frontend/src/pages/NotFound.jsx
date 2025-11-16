// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";
import image404 from "../assets/image_404.png"; // nouvelle image

export default function NotFound() {
  useEffect(() => {
    document.title = "Page introuvable — Trouve ton artisan";
  }, []);

  return (
    <main className="notfound-page container py-5 text-center">

      {/* Nouvelle image 404 */}
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