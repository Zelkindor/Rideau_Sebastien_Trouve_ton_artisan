import { Link } from "react-router-dom";

export default function ArtisanCard({ artisan }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2 className="h5 card-title">
          {artisan.prenom} {artisan.nom}
        </h2>
        {artisan.ville && (
          <p className="card-text mb-1">
            {artisan.ville}
          </p>
        )}
        {artisan.description && (
          <p className="card-text">
            {artisan.description}
          </p>
        )}
        <Link
          to={`/artisans/${artisan.id_artisan || artisan.id}`}
          className="btn btn-primary"
        >
          Voir la fiche
        </Link>
      </div>
    </div>
  );
}