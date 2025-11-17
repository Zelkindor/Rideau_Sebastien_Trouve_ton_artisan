// api/src/controllers/contact.controller.js
const { MessageContact, Artisan } = require("../models");
const { sendContactEmail } = require("../services/mailService");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.createContactMessage = async (req, res) => {
  try {
    const body = req.body || {};

    console.log("CONTACT BODY RECU :", body);

    // ====== RÉCUPÉRATION DES CHAMPS AVEC MAPPING FRONT ======

    // Nom + prénom : le front envoie nom_expediteur = "test1 test2"
    let fullName =
      (body.nom_expediteur ??
        body.nom ??
        body.name ??
        body.fullName ??
        "").toString().trim();

    let prenom = "";
    let nom = "";

    if (fullName) {
      const parts = fullName.split(" ");
      prenom = parts[0] || "";
      nom = parts.slice(1).join(" ") || "";
    }

    // On garde quand même la compatibilité si un jour tu changes le front
    prenom =
      (body.prenom ??
        body.firstName ??
        body.firstname ??
        prenom ??
        "").toString().trim();
    nom =
      (body.nom ??
        body.lastName ??
        body.lastname ??
        nom ??
        "").toString().trim();

    // Email : le front envoie email_expediteur
    let email = (
      body.email_expediteur ??
      body.email ??
      body.mail ??
      ""
    )
      .toString()
      .trim();

    // Objet : le front envoie objet
    let objet = (
      body.objet ??
      body.subject ??
      ""
    )
      .toString()
      .trim();

    // Message : le front envoie contenu_message
    let message = (
      body.contenu_message ??
      body.message ??
      body.content ??
      body.contenu ??
      ""
    )
      .toString()
      .trim();

    const id_artisan =
      body.id_artisan ?? body.artisanId ?? body.idArtisan ?? null;

    console.log("Valeurs interprétées :", {
      prenom,
      nom,
      email,
      objet,
      message,
      id_artisan,
    });

    // ====== VALIDATION BASIQUE ======

    if (!prenom || !nom || !email || !objet || !message) {
      return res.status(400).json({
        error:
          "Les champs prénom, nom, email, objet et message sont obligatoires.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "L'adresse email n'est pas valide.",
      });
    }

    if (objet.length < 3 || objet.length > 255) {
      return res.status(400).json({
        error: "L'objet doit contenir entre 3 et 255 caractères.",
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        error: "Le message doit contenir au moins 10 caractères.",
      });
    }

    // ====== RÉCUPÉRATION OPTIONNELLE DE L'ARTISAN ======

    let artisan = null;

    if (id_artisan) {
      artisan = await Artisan.findByPk(id_artisan);
      if (!artisan) {
        console.warn(
          `Aucun artisan trouvé pour id_artisan = ${id_artisan}, le message sera enregistré sans lien.`
        );
      }
    }

    // ====== ENREGISTREMENT EN BASE ======

    const saved = await MessageContact.create({
      nom_expediteur: `${prenom} ${nom}`.trim(),

      email_expediteur: email,
      objet,
      contenu_message: message,

      id_artisan: artisan ? artisan.id_artisan ?? artisan.id : null,
      id_specialite: body.id_specialite ?? null,
      id_categorie: body.id_categorie ?? null,
    });

    // ====== ENVOI EMAIL (ON NE BLOQUE PAS SI ÇA ÉCHOUE) ======

    try {
      await sendContactEmail({
        artisan,
        payload: { prenom, nom, email, objet, message },
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