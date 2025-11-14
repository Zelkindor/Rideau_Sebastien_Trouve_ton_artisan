const express = require("express");
const router = express.Router();
const artisansController = require("../controllers/artisans.controller");

router.get("/", artisansController.getArtisans);
router.get("/:id", artisansController.getArtisanById);

module.exports = router;