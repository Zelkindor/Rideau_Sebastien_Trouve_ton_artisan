const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./models");
const categoriesRoutes = require("./routes/categories.routes");
const artisansRoutes = require("./routes/artisans.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/categories", categoriesRoutes);
app.use("/artisans", artisansRoutes);
app.use("/contact", contactRoutes);

// Route de test
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API Trouve ton artisan opérationnelle" });
});

// Route de test DB
app.get("/health/db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", db: "connected" });
  } catch (error) {
    console.error("Erreur /health/db :", error);
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

module.exports = app;