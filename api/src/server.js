require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base MySQL réussie");

    // On ne fait PAS de sequelize.sync() ici pour ne pas modifier le schéma existant
    app.listen(PORT, () => {
      console.log(`API Trouve ton artisan démarrée sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à la base MySQL :", error.message);
    process.exit(1);
  }
}

startServer();
