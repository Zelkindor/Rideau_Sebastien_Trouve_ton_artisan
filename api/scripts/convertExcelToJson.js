// api/scripts/convertExcelToJson.js
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

// 1) Chemins à adapter si besoin
// Place ton fichier Excel ici : bdd/data.xlsx
const excelPath = path.join(__dirname, "..", "..", "bdd", "data.xlsx");
// Fichier JSON de sortie (utilisé par server.js)
const outputPath = path.join(__dirname, "..", "data", "artisans.json");

// 2) Correspondances entre noms texte et IDs (comme dans script_insertion.sql)
const categorieMap = {
  Alimentation: 1,
  "Bâtiment": 2,
  Fabrication: 3,
  Services: 4,
};

const specialiteMap = {
  Bijoutier: 1,
  Boucher: 2,
  Boulanger: 3,
  Chauffagiste: 4,
  Chocolatier: 5,
  Coiffeur: 6,
  Couturier: 7,
  Electricien: 8,
  Ferronier: 9,
  Fleuriste: 10,
  Menuisier: 11,
  Plombier: 12,
  Toiletteur: 13,
  Traiteur: 14,
  Webdesign: 15,
};

// 3) Lecture Excel
const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

// 4) Transformation → format attendu par le seed
const artisans = rows.map((row, index) => {
  const nom = row["Nom"];
  const note = row["Note"];
  const ville = row["Ville"];
  const a_propos = row["A propos"];
  const email = row["Email"];
  const siteWeb = row["Site Web"];
  const categorieNom = row["Catégorie"];
  const specialiteNom = row["Spécialité"];
  const top = !!row["Top"]; // booléen

  const id_categorie = categorieMap[categorieNom];
  const id_specialite = specialiteMap[specialiteNom];

  if (!id_categorie || !id_specialite) {
    console.warn(
      `⚠️ Ligne ${index + 2} : catégorie ou spécialité inconnue`,
      categorieNom,
      specialiteNom
    );
  }

  return {
    id_artisan: index + 1,
    nom,
    note,
    ville,
    a_propos,
    email,
    site_web: siteWeb || null,
    top,
    id_categorie,
    id_specialite,
  };
});

// 5) Écriture JSON
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(artisans, null, 2), "utf8");

console.log(`✅ Export terminé : ${outputPath}`);