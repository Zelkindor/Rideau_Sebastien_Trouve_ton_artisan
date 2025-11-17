const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categorie = sequelize.define(
  "Categorie",
  {
    id_categorie: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    nom_categorie: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: "categorie",
    timestamps: false
  }
);

module.exports = Categorie;