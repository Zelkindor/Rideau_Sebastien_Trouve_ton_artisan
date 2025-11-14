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

export async function getArtisans() {
  const result = await fetchJson("/artisans");

  if (Array.isArray(result)) {
    return result;
  }
  if (Array.isArray(result.data)) {
    return result.data;
  }
  return [];
}

export async function getArtisanById(id) {
  const result = await fetchJson(`/artisans/${id}`);

  if (result && result.data) {
    return result.data;
  }

  return result;
}