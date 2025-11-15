// api/src/models/index.js

const sequelize = require("../config/database");

// On importe les modèles déjà configurés
const Categorie = require("./Categorie");
const Specialite = require("./Specialite");
const Artisan = require("./Artisan");
const MessageContact = require("./message_contact");

// =========================
// Déclaration des relations
// =========================

// categorie 1 - N specialite
Categorie.hasMany(Specialite, {
  foreignKey: "id_categorie",
  as: "specialites",
});
Specialite.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie",
});

// categorie 1 - N artisan
Categorie.hasMany(Artisan, {
  foreignKey: "id_categorie",
  as: "artisans",
});
Artisan.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie",
});

// specialite 1 - N artisan
Specialite.hasMany(Artisan, {
  foreignKey: "id_specialite",
  as: "artisans",
});
Artisan.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  as: "specialite",
});

// artisan 1 - N message_contact
Artisan.hasMany(MessageContact, {
  foreignKey: "id_artisan",
  as: "messages",
});
MessageContact.belongsTo(Artisan, {
  foreignKey: "id_artisan",
  as: "artisan",
});

// (optionnel : si tu veux lier les messages à categorie / specialite,
// tu peux les laisser, sinon tu peux les commenter)
Specialite.hasMany(MessageContact, {
  foreignKey: "id_specialite",
  as: "messages_par_specialite",
});
MessageContact.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  as: "specialite",
});

Categorie.hasMany(MessageContact, {
  foreignKey: "id_categorie",
  as: "messages_par_categorie",
});
MessageContact.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie",
});

// =========================
// Export des modèles + sequelize
// =========================

module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan,
  MessageContact,
};