// routes/contact.routes.js
const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/", contactController.postContact);

module.exports = router;