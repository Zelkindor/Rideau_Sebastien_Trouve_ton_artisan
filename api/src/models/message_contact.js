// api/src/models/message_contact.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MessageContact = sequelize.define(
  "MessageContact",
  {
    id_message: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    // Nom et prénom de l’expéditeur (dans la BDD : un seul champ)
    nom_expediteur: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // Email de l’expéditeur
    email_expediteur: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    // Objet du message
    objet: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // Contenu complet du message
    contenu_message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // Liens éventuels (suivant ta BDD)
    id_artisan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_specialite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_categorie: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: "message_contact",
    timestamps: false,
  }
);

module.exports = MessageContact;