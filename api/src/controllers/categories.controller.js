const categoriesService = require("../services/categories.service");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Erreur GET /categories :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des catégories" });
  }
};