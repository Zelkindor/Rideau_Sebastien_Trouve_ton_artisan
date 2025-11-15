// api/services/mailService.js
const nodemailer = require("nodemailer");

console.log("[MAILTRAP] host =", process.env.MAILTRAP_HOST);
console.log("[MAILTRAP] user =", process.env.MAILTRAP_USER);
console.log("[MAILTRAP] pass =", process.env.MAILTRAP_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT || 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

async function sendContactEmail({ artisan, payload }) {
  const fromEmail =
    process.env.MAILTRAP_FROM || '"Trouve ton artisan" <no-reply@trouvetonartisan.fr>';

  // Si l'artisan a un email, on lui envoie directement.
  // Sinon on envoie sur une adresse de secours (ex: équipe support).
  const toEmail =
    artisan?.email || process.env.MAILTRAP_FALLBACK_TO || process.env.MAILTRAP_FROM;

  const artisanName =
  (artisan?.nom_entreprise ??
    `${artisan?.prenom ?? ""} ${artisan?.nom ?? ""}`.trim()) ||
  "un artisan";

  const subject = `Nouveau message pour ${artisanName}`;
  const plainText = `
Vous avez reçu un nouveau message via la plateforme "Trouve ton artisan".

Artisan concerné : ${artisanName}
Nom du demandeur : ${payload.prenom} ${payload.nom}
Email du demandeur : ${payload.email}

Message :
${payload.message}

Merci de répondre au demandeur sous 48h.
  `.trim();

  const html = `
    <p>Vous avez reçu un nouveau message via la plateforme <strong>« Trouve ton artisan »</strong>.</p>
    <p><strong>Artisan concerné :</strong> ${artisanName}</p>
    <p><strong>Demandeur :</strong> ${payload.prenom} ${payload.nom}<br>
    <strong>Email :</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
    <p><strong>Message :</strong></p>
    <p>${payload.message.replace(/\n/g, "<br>")}</p>
    <p>Merci de répondre au demandeur sous 48h.</p>
  `;

  await transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject,
    text: plainText,
    html,
  });
}

module.exports = {
  sendContactEmail,
};