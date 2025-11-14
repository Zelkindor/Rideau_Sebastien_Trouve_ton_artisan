import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById } from "../services/api";

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtisan() {
      try {
        setLoading(true);
        const data = await getArtisanById(id);
        setArtisan(data);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement de l'artisan");
      } finally {
        setLoading(false);
      }
    }

    loadArtisan();
  }, [id]);

  if (loading) {
    return <p>Chargement de la fiche artisan...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!artisan) {
    return <p>Artisan introuvable.</p>;
  }

  return (
    <div>
      <h1 className="mb-3">
        {artisan.prenom} {artisan.nom}
      </h1>

      {artisan.ville && <p>Ville : {artisan.ville}</p>}
      {artisan.email && <p>Email : {artisan.email}</p>}
      {artisan.telephone && <p>Téléphone : {artisan.telephone}</p>}

      {artisan.description && (
        <p className="mt-3">
          {artisan.description}
        </p>
      )}
    </div>
  );
}