// api/routes/contact.routes.js
const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// POST /contact
router.post("/", contactController.createContactMessage);

module.exports = router;