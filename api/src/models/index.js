// models/index.js
const sequelize = require("../config/database");
const Categorie = require("./Categorie");
const Specialite = require("./Specialite");
const Artisan = require("./Artisan");
const MessageContact = require("./MessageContact");

// categorie 1 - N specialite
Categorie.hasMany(Specialite, {
  foreignKey: "id_categorie",
  as: "specialites"
});
Specialite.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie"
});

// categorie 1 - N artisan
Categorie.hasMany(Artisan, {
  foreignKey: "id_categorie",
  as: "artisans"
});
Artisan.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie"
});

// specialite 1 - N artisan
Specialite.hasMany(Artisan, {
  foreignKey: "id_specialite",
  as: "artisans"
});
Artisan.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  as: "specialite"
});

// artisan 1 - N message_contact
Artisan.hasMany(MessageContact, {
  foreignKey: "id_artisan",
  as: "messages"
});
MessageContact.belongsTo(Artisan, {
  foreignKey: "id_artisan",
  as: "artisan"
});

// specialite 1 - N message_contact
Specialite.hasMany(MessageContact, {
  foreignKey: "id_specialite",
  as: "messages_par_specialite"
});
MessageContact.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  as: "specialite"
});

// categorie 1 - N message_contact
Categorie.hasMany(MessageContact, {
  foreignKey: "id_categorie",
  as: "messages_par_categorie"
});
MessageContact.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie"
});

module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan,
  MessageContact
};