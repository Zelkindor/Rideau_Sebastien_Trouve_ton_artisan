const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors());
app.use(express.json());

// Route de test
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API Trouve ton artisan opérationnelle" });
});

module.exports = app;