const { Categorie, Specialite } = require("../models");

exports.getAllCategories = async () => {
  return await Categorie.findAll({
    include: [
      {
        model: Specialite,
        as: "specialites",
        attributes: ["id_specialite", "nom_specialite"]
      }
    ],
    order: [
      ["nom_categorie", "ASC"],
      [{ model: Specialite, as: "specialites" }, "nom_specialite", "ASC"]
    ]
  });
};
