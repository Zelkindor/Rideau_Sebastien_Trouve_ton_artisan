// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCategories, getArtisans } from "../services/api";
import logo from "../assets/logo.png";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        const list = Array.isArray(data) ? data : [];
        setCategories(list);
      } catch (error) {
        console.error("Erreur chargement catégories :", error);
      }
    }

    loadCategories();
  }, []);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const term = searchTerm.trim();
    if (!term) {
      setSearchError("");
      return;
    }

    try {
      setIsSearching(true);
      setSearchError("");

      const data = await getArtisans();
      const list = Array.isArray(data) ? data : [];

      const lower = term.toLowerCase();

      const match = list.find((a) => {
        const nomEntreprise = (a.nom_entreprise || "").toLowerCase();
        const fullName = `${a.prenom ?? ""} ${a.nom ?? ""}`
          .trim()
          .toLowerCase();
        return (
          nomEntreprise.includes(lower) ||
          fullName.includes(lower)
        );
      });

      if (!match) {
        setSearchError("Aucun artisan trouvé pour ce nom.");
        return;
      }

      const id = match.id_artisan ?? match.id;
      if (!id) {
        setSearchError("Artisan trouvé mais identifiant manquant.");
        return;
      }

      navigate(`/artisans/${id}`);
      setSearchError("");
      setSearchTerm("");
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setSearchError("Erreur lors de la recherche. Réessayez plus tard.");
    } finally {
      setIsSearching(false);
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const activeCategoryId = searchParams.get("categorie");

  return (
    <header className="site-header">
      <div className="container d-flex align-items-center justify-content-between site-header-inner">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="site-logo-link">
            <img src={logo} alt="Trouve ton artisan" className="site-logo-img" />
          </Link>
        </div>

        <nav className="site-nav d-none d-md-flex align-items-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id_categorie ?? cat.id}
              to={`/artisans?categorie=${cat.id_categorie ?? cat.id}`}
              className={
                "site-nav-link" +
                ((activeCategoryId &&
                  String(activeCategoryId) ===
                    String(cat.id_categorie ?? cat.id))
                  ? " site-nav-link-active"
                  : "")
              }
            >
              {cat.nom_categorie ?? cat.nom}
            </Link>
          ))}
        </nav>

        <form className="site-search-form d-flex align-items-center" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="form-control site-search-input"
            placeholder="Rechercher un artisan…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="site-search-btn" disabled={isSearching}>
            {isSearching ? "…" : "Rechercher"}
          </button>
        </form>
      </div>

      {searchError && (
        <div className="site-search-error text-center">
          {searchError}
        </div>
      )}
    </header>
  );
}