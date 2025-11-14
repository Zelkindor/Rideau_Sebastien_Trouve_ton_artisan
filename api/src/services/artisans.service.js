// services/artisans.service.js
const { Op } = require("sequelize");
const { Artisan, Specialite, Categorie } = require("../models");

exports.getArtisans = async (params) => {
  const {
    id_categorie,
    id_specialite,
    ville,
    search,
    top,
    min_note,
    page,
    limit
  } = params;

  const where = {};

  // Filtre par spécialité
  if (id_specialite) {
    where.id_specialite = id_specialite;
  }

  // Filtre par catégorie (directement sur la colonne id_categorie de artisan)
  if (id_categorie) {
    where.id_categorie = id_categorie;
  }

  // Filtre par ville
  if (ville) {
    where.ville = ville;
  }

  // Filtre par top (1 / true)
  if (top !== undefined) {
    if (top === "1" || top === "true" || top === 1) {
      where.top = true;
    } else if (top === "0" || top === "false" || top === 0) {
      where.top = false;
    }
  }

  // Filtre par note minimale
  if (min_note !== undefined) {
    const value = parseFloat(min_note);
    if (!Number.isNaN(value)) {
      where.note = { [Op.gte]: value };
    }
  }

  // Recherche texte : nom + a_propos
  if (search) {
    where[Op.or] = [
      { nom: { [Op.like]: `%${search}%` } },
      { a_propos: { [Op.like]: `%${search}%` } }
    ];
  }

  // Pagination
  const pageInt = parseInt(page, 10) || 1;
  const limitInt = parseInt(limit, 10) || 10;
  const offset = (pageInt - 1) * limitInt;

  // Jointures pour récupérer spécialité + catégorie
  const include = [
    {
      model: Specialite,
      as: "specialite",
      include: [
        {
          model: Categorie,
          as: "categorie"
        }
      ]
    },
    {
      model: Categorie,
      as: "categorie"
    }
  ];

  const { rows, count } = await Artisan.findAndCountAll({
    where,
    include,
    limit: limitInt,
    offset,
    order: [
      ["nom", "ASC"],
      ["id_artisan", "ASC"]
    ]
  });

  return {
    total: count,
    page: pageInt,
    limit: limitInt,
    data: rows
  };
};