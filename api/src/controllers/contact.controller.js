// controllers/contact.controller.js
const contactService = require("../services/contact.service");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.postContact = async (req, res) => {
  try {
    const {
      nom_expediteur,
      email_expediteur,
      contenu_message,
      id_artisan,
      id_specialite,
      id_categorie
    } = req.body || {};

    const errors = [];

    if (!nom_expediteur || typeof nom_expediteur !== "string" || nom_expediteur.trim().length < 2) {
      errors.push("Le nom de l'expéditeur est obligatoire (au moins 2 caractères).");
    }

    if (!email_expediteur || !isValidEmail(email_expediteur)) {
      errors.push("L'email de l'expéditeur est obligatoire et doit être valide.");
    }

    if (!contenu_message || typeof contenu_message !== "string" || contenu_message.trim().length < 10) {
      errors.push("Le message est obligatoire (au moins 10 caractères).");
    }

    const parseOptionalInt = (value) => {
      if (value === null || value === undefined || value === "") return null;
      const n = Number(value);
      return Number.isNaN(n) ? null : n;
    };

    const normalizedPayload = {
      nom_expediteur: nom_expediteur?.trim(),
      email_expediteur: email_expediteur?.trim(),
      contenu_message: contenu_message?.trim(),
      id_artisan: parseOptionalInt(id_artisan),
      id_specialite: parseOptionalInt(id_specialite),
      id_categorie: parseOptionalInt(id_categorie)
    };

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const message = await contactService.createContactMessage(normalizedPayload);

    return res.status(201).json({
      message: "Message de contact enregistré avec succès.",
      data: {
        id_message: message.id_message
      }
    });
  } catch (error) {
    console.error("Erreur POST /contact :", error);
    return res.status(500).json({
      error: "Erreur serveur lors de l'enregistrement du message de contact"
    });
  }
};