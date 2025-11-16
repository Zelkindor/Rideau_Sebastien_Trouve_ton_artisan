// src/pages/Contact.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getArtisanById, sendContactMessage } from "../services/api";

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const artisanIdFromQuery = searchParams.get("artisan");

  const [artisan, setArtisan] = useState(null);
  const [loadingArtisan, setLoadingArtisan] = useState(!!artisanIdFromQuery);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    document.title = "Contact — Trouve ton artisan";
  }, []);

  useEffect(() => {
    async function loadArtisan() {
      if (!artisanIdFromQuery) return;

      try {
        setLoadingArtisan(true);
        const data = await getArtisanById(artisanIdFromQuery);
        setArtisan(data || null);
      } catch (error) {
        console.error("Erreur chargement artisan pour contact :", error);
        setArtisan(null);
      } finally {
        setLoadingArtisan(false);
      }
    }

    loadArtisan();
  }, [artisanIdFromQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSendError("");
    setSendSuccess(false);

    const trimmedPrenom = prenom.trim();
    const trimmedNom = nom.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedPrenom || !trimmedNom || !trimmedEmail || !trimmedMessage) {
      setSendError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSending(true);

      const payload = {
        prenom: trimmedPrenom,
        nom: trimmedNom,
        email: trimmedEmail,
        message: trimmedMessage,
      };

      const artisanId =
        artisan?.id_artisan ?? artisan?.id ?? artisanIdFromQuery ?? null;
      if (artisanId) {
        payload.id_artisan = artisanId;
      }

      await sendContactMessage(payload);

      setSendSuccess(true);
      setPrenom("");
      setNom("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Erreur envoi contact :", error);
      setSendError(
        "Une erreur est survenue lors de l'envoi du message. Merci de réessayer plus tard."
      );
    } finally {
      setSending(false);
    }
  };

  const artisanName = artisan
    ? artisan.nom_entreprise ??
      `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim()
    : null;

  return (
    <main className="contact-page">
      <div className="container">
        <header className="contact-header mb-4">
          <h1 className="contact-title">Contact</h1>
          <p className="contact-subtitle">
            Utilisez ce formulaire pour contacter un artisan référencé sur la
            plateforme. Une réponse vous sera apportée sous 48h.
          </p>
        </header>

        <section className="contact-layout">
          <div className="contact-main">
            <h2 className="contact-section-title">
              Vos informations
            </h2>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="contact-prenom" className="form-label">
                    Prénom *
                  </label>
                  <input
                    id="contact-prenom"
                    type="text"
                    className="form-control"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="contact-nom" className="form-label">
                    Nom *
                  </label>
                  <input
                    id="contact-nom"
                    type="text"
                    className="form-control"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="contact-email" className="form-label">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="contact-message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-control"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <div className="form-text">
                    Expliquez votre demande : devis, question, précision sur une
                    prestation…
                  </div>
                </div>
              </div>

              {sendError && (
                <p className="contact-alert contact-alert-error mt-3">
                  {sendError}
                </p>
              )}

              {sendSuccess && (
                <p className="contact-alert contact-alert-success mt-3">
                  Votre message a bien été envoyé. Une réponse vous sera
                  apportée sous 48h.
                </p>
              )}

              <button
                type="submit"
                className="btn contact-submit-btn mt-3"
                disabled={sending}
              >
                {sending ? "Envoi en cours…" : "Envoyer le message"}
              </button>
            </form>
          </div>

          <aside className="contact-aside">
            <div className="contact-aside-card">
              <h2 className="contact-section-title">
                Artisan concerné
              </h2>

              {loadingArtisan && artisanIdFromQuery && (
                <p>Chargement des informations de l&apos;artisan…</p>
              )}

              {!loadingArtisan && artisanIdFromQuery && artisan && (
                <>
                  <p className="contact-artisan-name">
                    {artisanName}
                  </p>
                  {artisan.nom_specialite && (
                    <p className="contact-artisan-specialite">
                      {artisan.nom_specialite}
                    </p>
                  )}
                  {artisan.ville && (
                    <p className="contact-artisan-ville">
                      {artisan.ville}
                    </p>
                  )}
                  <p className="contact-artisan-note">
                    Votre message lui sera transmis directement.
                  </p>
                </>
              )}

              {!loadingArtisan && artisanIdFromQuery && !artisan && (
                <p>
                  L&apos;artisan indiqué dans le lien n&apos;a pas pu être
                  chargé. Votre message sera tout de même pris en compte.
                </p>
              )}

              {!artisanIdFromQuery && (
                <p>
                  Vous pouvez utiliser ce formulaire pour poser une question
                  générale sur la plateforme ou sur un artisan en
                  particulier. Précisez simplement le nom de l&apos;artisan
                  dans votre message.
                </p>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}