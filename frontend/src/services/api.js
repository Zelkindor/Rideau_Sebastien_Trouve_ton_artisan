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

  if (filters.top !== undefined && filters.top !== null) {
    params.append("top", String(filters.top));
  }

  if (filters.page !== undefined && filters.page !== null) {
    params.append("page", String(filters.page));
  }

  if (filters.limit !== undefined && filters.limit !== null) {
    params.append("limit", String(filters.limit));
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
  const response = await fetch(`${API_BASE_URL}/artisans/${id}`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement de l'artisan");
  }

  return await response.json();
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

// Liste contact
export async function sendContactMessage(form) {
  const payload = {
    nom_expediteur:
      form.nom_expediteur ??
      `${form.prenom ?? ""} ${form.nom ?? ""}`.trim(),

    email_expediteur: form.email_expediteur ?? form.email ?? "",

    objet: form.objet ?? form.subject ?? "",

    contenu_message:
      form.contenu_message ??
      form.message ??
      "",

    id_artisan: form.id_artisan ?? null,
    id_specialite: form.id_specialite ?? null,
    id_categorie: form.id_categorie ?? null,
  };

  return fetchJson("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}