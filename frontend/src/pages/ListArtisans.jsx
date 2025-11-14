import { useEffect, useState } from "react";
import { getArtisans, getCategories } from "../services/api";
import ArtisanCard from "../components/ArtisanCard";

export default function ListArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSpecialiteId, setSelectedSpecialiteId] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadArtisans() {
      try {
        setLoading(true);
        setError("");

        const filtersForApi = {
          categoryId: selectedCategoryId || undefined,
          specialiteId: selectedSpecialiteId || undefined,
        };

        const data = await getArtisans(filtersForApi);

        let filtered = data;

        if (search && search.trim() !== "") {
          const lower = search.toLowerCase();

          filtered = data.filter((artisan) => {
            const fields = [
              artisan.nom_entreprise,
              artisan.entreprise,
              artisan.nom,
              artisan.prenom,
              artisan.ville,
              artisan.description,
              artisan.nom_specialite,
              artisan.specialite,
              artisan.nom_categorie,
              artisan.categorie,
            ];

            return fields.some(
              (field) =>
                typeof field === "string" &&
                field.toLowerCase().includes(lower)
            );
          });
        }

        setArtisans(filtered);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des artisans");
      } finally {
        setLoading(false);
      }
    }

    loadArtisans();
  }, [selectedCategoryId, selectedSpecialiteId, search]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategoryId(value);
    setSelectedSpecialiteId("");
  };

  const handleSpecialiteChange = (event) => {
    setSelectedSpecialiteId(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    setSearch(searchInput);
  };

  const currentCategory = categories.find(
    (cat) => String(cat.id_categorie || cat.id) === String(selectedCategoryId)
  );

  const specialitesForCategory =
    currentCategory?.specialites || currentCategory?.Specialites || [];

  if (loading) {
    return <p>Chargement des artisans...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h1 className="mb-4">Liste des artisans</h1>

      <form className="row g-3 mb-4" onSubmit={handleFilterSubmit}>
        <div className="col-md-4">
          <label className="form-label">Catégorie</label>
          <select
            className="form-select"
            value={selectedCategoryId}
            onChange={handleCategoryChange}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option
                key={cat.id_categorie || cat.id}
                value={cat.id_categorie || cat.id}
              >
                {cat.nom_categorie || cat.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Spécialité</label>
          <select
            className="form-select"
            value={selectedSpecialiteId}
            onChange={handleSpecialiteChange}
            disabled={!selectedCategoryId}
          >
            <option value="">Toutes les spécialités</option>
            {specialitesForCategory.map((spe) => (
              <option
                key={spe.id_specialite || spe.id}
                value={spe.id_specialite || spe.id}
              >
                {spe.nom_specialite || spe.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Recherche</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nom, ville, entreprise…"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        </div>
      </form>

      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé avec ces critères.</p>
      ) : (
        artisans.map((artisan) => (
          <ArtisanCard
            key={artisan.id_artisan || artisan.id}
            artisan={artisan}
          />
        ))
      )}
    </div>
  );
}