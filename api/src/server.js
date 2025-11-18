require("dotenv").config();
const app = require("./app");
const { sequelize, Categorie, Specialite, Artisan } = require("./models");

const PORT = process.env.PORT || 3001;
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

// Seed spécifique pour SQLite (Render)
async function seedSqliteIfEmpty() {
  if (DB_DIALECT !== "sqlite") {
    return;
  }

  const artisanCount = await Artisan.count();
  if (artisanCount > 0) {
    console.log("Données déjà présentes, seed SQLite ignoré.");
    return;
  }

  console.log("Initialisation des données SQLite…");

  // 1) Catégories (comme dans script_insertion.sql)
  const categories = [
    { id_categorie: 1, nom_categorie: "Alimentation" },
    { id_categorie: 2, nom_categorie: "Bâtiment" },
    { id_categorie: 3, nom_categorie: "Fabrication" },
    { id_categorie: 4, nom_categorie: "Services" },
  ];

  // 2) Spécialités (copie exacte du SQL)
  const specialites = [
    { id_specialite: 1, nom_specialite: "Bijoutier", id_categorie: 3 },
    { id_specialite: 2, nom_specialite: "Boucher", id_categorie: 1 },
    { id_specialite: 3, nom_specialite: "Boulanger", id_categorie: 1 },
    { id_specialite: 4, nom_specialite: "Chauffagiste", id_categorie: 2 },
    { id_specialite: 5, nom_specialite: "Chocolatier", id_categorie: 1 },
    { id_specialite: 6, nom_specialite: "Coiffeur", id_categorie: 4 },
    { id_specialite: 7, nom_specialite: "Couturier", id_categorie: 3 },
    { id_specialite: 8, nom_specialite: "Electricien", id_categorie: 2 },
    { id_specialite: 9, nom_specialite: "Ferronier", id_categorie: 3 },
    { id_specialite: 10, nom_specialite: "Fleuriste", id_categorie: 4 },
    { id_specialite: 11, nom_specialite: "Menuisier", id_categorie: 2 },
    { id_specialite: 12, nom_specialite: "Plombier", id_categorie: 2 },
    { id_specialite: 13, nom_specialite: "Toiletteur", id_categorie: 4 },
    { id_specialite: 14, nom_specialite: "Traiteur", id_categorie: 1 },
    { id_specialite: 15, nom_specialite: "Webdesign", id_categorie: 4 },
  ];

  await Categorie.bulkCreate(categories);
  await Specialite.bulkCreate(specialites);

  // Artisans depuis le JSON généré à partir de l’Excel
  // Fichier à créer : api/data/artisans.json
  const artisansSource = require("../data/artisans.json");

  const artisans = artisansSource.map((row, index) => ({
    id_artisan: row.id_artisan ?? index + 1,
    nom: row.nom,
    note: Number(row.note),
    ville: row.ville,
    a_propos:
      row.a_propos || "Texte de présentation de l'artisan.",
    email: row.email,
    site_web: row.site_web || null,
    top: row.top ? 1 : 0,
    id_categorie: row.id_categorie,
    id_specialite: row.id_specialite,
  }));

  await Artisan.bulkCreate(artisans);

  console.log("Données SQLite initialisées depuis artisans.json");
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(`Connexion à la base (${DB_DIALECT}) réussie`);

    if (DB_DIALECT === "sqlite") {
      await sequelize.sync();
      await seedSqliteIfEmpty();
    }

    app.listen(PORT, () => {
      console.log(`API Trouve ton artisan démarrée sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur de démarrage du serveur :", error);
    process.exit(1);
  }
}

startServer();