// services/contact.service.js
const nodemailer = require("nodemailer");
const { MessageContact } = require("../models");

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = parseInt(process.env.MAIL_PORT || "2525", 10);
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || MAIL_USER;

// Transporter Mailtrap
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

exports.createContactMessage = async (payload) => {
  const {
    nom_expediteur,
    email_expediteur,
    contenu_message,
    id_artisan = null,
    id_specialite = null,
    id_categorie = null
  } = payload;

  // 1. Enregistrement en base
  const message = await MessageContact.create({
    nom_expediteur,
    email_expediteur,
    contenu_message,
    id_artisan,
    id_specialite,
    id_categorie
  });

  // 2. Envoi d'email (best-effort : si ça casse, on ne fait pas échouer la création)
  if (CONTACT_RECIPIENT && MAIL_HOST && MAIL_USER && MAIL_PASS) {
    const subject = "Nouveau message de contact - Trouve ton artisan";
    const text = `
Nouveau message de contact reçu :

Nom : ${nom_expediteur}
Email : ${email_expediteur}

Message :
${contenu_message}

Contexte :
- id_artisan: ${id_artisan ?? "aucun"}
- id_specialite: ${id_specialite ?? "aucun"}
- id_categorie: ${id_categorie ?? "aucun"}
`.trim();

    try {
      await transporter.sendMail({
        from: `"Trouve ton artisan" <no-reply@trouve-ton-artisan.local>`,
        to: CONTACT_RECIPIENT,
        replyTo: email_expediteur,
        subject,
        text
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email de contact :", error);
    }
  }

  return message;
};