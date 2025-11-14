// models/MessageContact.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MessageContact = sequelize.define(
  "MessageContact",
  {
    id_message: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    // nom_expediteur VARCHAR(150) NOT NULL
    nom_expediteur: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    // email_expediteur VARCHAR(255) NOT NULL
    email_expediteur: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    // contenu_message TEXT NOT NULL
    contenu_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    // id_artisan INT UNSIGNED NULL
    id_artisan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },

    // id_specialite INT UNSIGNED NULL
    id_specialite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },

    // id_categorie INT UNSIGNED NULL
    id_categorie: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  },
  {
    tableName: "message_contact",
    timestamps: false
  }
);

module.exports = MessageContact;