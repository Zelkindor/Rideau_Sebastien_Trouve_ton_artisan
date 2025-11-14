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
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_artisan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true // message facultativement lié à un artisan
    }
  },
  {
    tableName: "message_contact",
    timestamps: false
  }
);

module.exports = MessageContact;