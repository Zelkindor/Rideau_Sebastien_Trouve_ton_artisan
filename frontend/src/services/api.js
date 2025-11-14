// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchJson(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const message = `Erreur API ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

// Liste des artisans avec filtres SERVEUR (catégorie / spécialité uniquement)
export async function getArtisans(filters = {}) {
  const params = new URLSearchParams();

  if (filters.categoryId) {
    params.append("categoryId", filters.categoryId);
  }

  if (filters.specialiteId) {
    params.append("specialiteId", filters.specialiteId);
  }

  const queryString = params.toString();
  const path = queryString ? `/artisans?${queryString}` : "/artisans";

  const result = await fetchJson(path);

  if (Array.isArray(result)) {
    return result;
  }

  if (result && Array.isArray(result.data)) {
    return result.data;
  }

  if (result && Array.isArray(result.artisans)) {
    return result.artisans;
  }

  return [];
}

// Détail d'un artisan
export async function getArtisanById(id) {
  const result = await fetchJson(`/artisans/${id}`);

  if (!result) {
    return null;
  }

  if (result.data) {
    return result.data;
  }

  if (result.artisan) {
    return result.artisan;
  }

  return result;
}

// Liste des catégories
export async function getCategories() {
  const result = await fetchJson("/categories");

  if (Array.isArray(result)) {
    return result;
  }

  if (result && Array.isArray(result.data)) {
    return result.data;
  }

  if (result && Array.isArray(result.categories)) {
    return result.categories;
  }

  return [];
}