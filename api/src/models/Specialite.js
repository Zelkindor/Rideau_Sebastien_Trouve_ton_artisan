// models/Specialite.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Specialite = sequelize.define(
  "Specialite",
  {
    id_specialite: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    nom_specialite: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_categorie: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    tableName: "specialite",
    timestamps: false
  }
);

module.exports = Specialite;