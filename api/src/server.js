require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3001;
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connexion à la base ${DB_DIALECT} réussie`);

    // En production SQLite (Render), on synchronise le schéma
    if (DB_DIALECT === "sqlite") {
      await sequelize.sync();
      console.log("✅ Schéma SQLite synchronisé");
    }

    app.listen(PORT, () => {
      console.log(
        `API Trouve ton artisan démarrée sur http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error.message);
    process.exit(1);
  }
}

startServer();