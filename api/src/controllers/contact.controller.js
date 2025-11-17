// api/src/controllers/contact.controller.js
const { MessageContact, Artisan } = require("../models");
const { sendContactEmail } = require("../services/mailService");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valide et normalise les données du formulaire de contact.
 * Retourne :
 * - { isValid: true, data } si tout est OK
 * - { isValid: false, errors } sinon
 */
function validateContactPayload(rawBody) {
  const body = rawBody || {};
  const errors = {};

  const safeString = (value) => (value ?? "").toString().trim();

  const nom_expediteur = safeString(
    body.nom_expediteur ??
      (body.nom && body.prenom
        ? `${body.prenom} ${body.nom}`
        : body.nom ?? "")
  );

  const email_expediteur = safeString(
    body.email_expediteur ?? body.email ?? ""
  );

  const objet = safeString(body.objet ?? body.subject ?? "");
  const contenu_message = safeString(
    body.contenu_message ?? body.message ?? body.contenu ?? ""
  );

  // IDs optionnels
  const id_artisan =
    body.id_artisan !== undefined && body.id_artisan !== null
      ? Number(body.id_artisan)
      : null;
  const id_specialite =
    body.id_specialite !== undefined && body.id_specialite !== null
      ? Number(body.id_specialite)
      : null;
  const id_categorie =
    body.id_categorie !== undefined && body.id_categorie !== null
      ? Number(body.id_categorie)
      : null;

  // ---- VALIDATION NOM ----
  if (!nom_expediteur) {
    errors.nom_expediteur = "Le nom de l'expéditeur est obligatoire.";
  } else if (nom_expediteur.length > 255) {
    errors.nom_expediteur =
      "Le nom de l'expéditeur ne peut pas dépasser 255 caractères.";
  }

  // ---- VALIDATION EMAIL ----
  if (!email_expediteur) {
    errors.email_expediteur = "L'adresse email est obligatoire.";
  } else if (email_expediteur.length > 255) {
    errors.email_expediteur =
      "L'adresse email ne peut pas dépasser 255 caractères.";
  } else if (!isValidEmail(email_expediteur)) {
    errors.email_expediteur = "L'adresse email n'est pas valide.";
  }

  // ---- VALIDATION OBJET ----
  if (!objet) {
    errors.objet = "L'objet du message est obligatoire.";
  } else if (objet.length < 3) {
    errors.objet = "L'objet doit contenir au moins 3 caractères.";
  } else if (objet.length > 255) {
    errors.objet = "L'objet ne peut pas dépasser 255 caractères.";
  }

  // ---- VALIDATION CONTENU MESSAGE ----
  if (!contenu_message) {
    errors.contenu_message = "Le message est obligatoire.";
  } else if (contenu_message.length < 10) {
    errors.contenu_message =
      "Le message doit contenir au moins 10 caractères.";
  }

  // ---- VALIDATION IDs ----
  if (id_artisan !== null && (!Number.isInteger(id_artisan) || id_artisan <= 0)) {
    errors.id_artisan = "L'identifiant de l'artisan doit être un entier positif.";
  }

  if (
    id_specialite !== null &&
    (!Number.isInteger(id_specialite) || id_specialite <= 0)
  ) {
    errors.id_specialite =
      "L'identifiant de la spécialité doit être un entier positif.";
  }

  if (
    id_categorie !== null &&
    (!Number.isInteger(id_categorie) || id_categorie <= 0)
  ) {
    errors.id_categorie =
      "L'identifiant de la catégorie doit être un entier positif.";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: {
      nom_expediteur,
      email_expediteur,
      objet,
      contenu_message,
      id_artisan,
      id_specialite,
      id_categorie,
    },
  };
}

exports.createContactMessage = async (req, res) => {
  try {
    const { isValid, errors, data } = validateContactPayload(req.body || {});

    if (!isValid) {
      return res.status(400).json({
        error: "Les données du formulaire sont invalides.",
        details: errors,
      });
    }

    const {
      nom_expediteur,
      email_expediteur,
      objet,
      contenu_message,
      id_artisan,
      id_specialite,
      id_categorie,
    } = data;

    let artisan = null;

    if (id_artisan !== null) {
      artisan = await Artisan.findByPk(id_artisan);
      if (!artisan) {
        return res.status(400).json({
          error: "Les données du formulaire sont invalides.",
          details: {
            id_artisan: "L'artisan spécifié est introuvable.",
          },
        });
      }
    }

    // ====== ENREGISTREMENT EN BASE ======
    const saved = await MessageContact.create({
      nom_expediteur,
      email_expediteur,
      objet,
      contenu_message,
      id_artisan: artisan ? artisan.id_artisan ?? artisan.id : null,
      id_specialite,
      id_categorie,
    });

    // ====== ENVOI EMAIL ======
    try {
      await sendContactEmail({
        artisan,
        payload: {
          nom_expediteur,
          email_expediteur,
          objet,
          message: contenu_message,
        },
      });
    } catch (mailError) {
      console.error("Erreur durant l'envoi du mail de contact :", mailError);
    }

    return res.status(201).json({
      success: true,
      message: "Votre message a bien été envoyé.",
      id_message: saved.id_message,
    });
  } catch (error) {
    console.error("Erreur createContactMessage :", error);
    return res.status(500).json({
      error:
        "Une erreur interne est survenue lors de l'envoi du message. Veuillez réessayer plus tard.",
    });
  }
};