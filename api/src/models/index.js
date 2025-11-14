const sequelize = require("../config/database");
const Categorie = require("./Categorie");
const Specialite = require("./Specialite");
const Artisan = require("./Artisan");
const MessageContact = require("./MessageContact");

// Associations
Categorie.hasMany(Specialite, {
  foreignKey: "id_categorie",
  as: "specialites"
});
Specialite.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  as: "categorie"
});

Specialite.hasMany(Artisan, {
  foreignKey: "id_specialite",
  as: "artisans"
});
Artisan.belongsTo(Specialite, {
  foreignKey: "id_specialite",
  as: "specialite"
});

Artisan.hasMany(MessageContact, {
  foreignKey: "id_artisan",
  as: "messages"
});
MessageContact.belongsTo(Artisan, {
  foreignKey: "id_artisan",
  as: "artisan"
});

module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan,
  MessageContact
};