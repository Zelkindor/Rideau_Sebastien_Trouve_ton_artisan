// controllers/artisans.controller.js
const artisansService = require("../services/artisans.service");

exports.getArtisans = async (req, res) => {
  try {
    const {
      id_categorie,
      id_specialite,
      ville,
      search,
      top,
      min_note,
      page = 1,
      limit = 10
    } = req.query;

    const result = await artisansService.getArtisans({
      id_categorie,
      id_specialite,
      ville,
      search,
      top,
      min_note,
      page,
      limit
    });

    res.json(result);
  } catch (error) {
    console.error("Erreur GET /artisans :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des artisans"
    });
  }
};

exports.getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;

    const artisan = await artisansService.getArtisanById(id);

    if (!artisan) {
      return res.status(404).json({ error: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (error) {
    console.error("Erreur GET /artisans/:id :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération de l'artisan"
    });
  }
};