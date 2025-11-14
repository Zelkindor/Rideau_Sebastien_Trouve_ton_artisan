// models/Artisan.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Artisan = sequelize.define(
  "Artisan",
  {
    id_artisan: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    // nom VARCHAR(150) NOT NULL
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    // note DECIMAL(2,1) NOT NULL
    note: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false
    },

    // ville VARCHAR(100) NOT NULL
    ville: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    // a_propos TEXT NOT NULL
    a_propos: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    // email VARCHAR(255) NOT NULL UNIQUE
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },

    // site_web VARCHAR(255) NULL
    site_web: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    // top TINYINT(1) NOT NULL DEFAULT 0
    top: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    // id_specialite INT UNSIGNED NOT NULL
    id_specialite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

    // id_categorie INT UNSIGNED NOT NULL
    id_categorie: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    tableName: "artisan",
    timestamps: false
  }
);

module.exports = Artisan;