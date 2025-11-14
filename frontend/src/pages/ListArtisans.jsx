import { useEffect, useState } from "react";
import { getArtisans } from "../services/api";
import ArtisanCard from "../components/ArtisanCard";

export default function ListArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtisans() {
      try {
        setLoading(true);
        const data = await getArtisans();
        setArtisans(data);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des artisans");
      } finally {
        setLoading(false);
      }
    }

    loadArtisans();
  }, []);

  if (loading) {
    return <p>Chargement des artisans...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (artisans.length === 0) {
    return <p>Aucun artisan trouvé.</p>;
  }

  return (
    <div>
      <h1 className="mb-4">Liste des artisans</h1>
      {artisans.map((artisan) => (
        <ArtisanCard key={artisan.id_artisan || artisan.id} artisan={artisan} />
      ))}
    </div>
  );
}