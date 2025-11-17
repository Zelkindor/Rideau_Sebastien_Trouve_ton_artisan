// src/pages/ArtisanDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtisanById, sendContactMessage } from "../services/api";
import ArtisanImage from "../assets/image_artisan.png";

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // États pour le formulaire de contact intégré à la fiche
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    async function loadArtisan() {
      try {
        setLoading(true);
        setHasError(false);

        const data = await getArtisanById(id);
        setArtisan(data || null);
      } catch (error) {
        console.error("Erreur chargement artisan :", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadArtisan();
  }, [id]);

  if (loading) {
    return (
      <main className="artisan-page container py-5">
        <p>Chargement de la fiche artisan…</p>
      </main>
    );
  }

  if (hasError || !artisan) {
    return (
      <main className="artisan-page container py-5">
        <p className="text-danger">
          Impossible de charger la fiche de cet artisan.
        </p>
        <Link to="/artisans" className="btn artisan-back-btn">
          Retour à la liste des artisans
        </Link>
      </main>
    );
  }

  const entreprise =
    artisan.nom_entreprise ??
    (artisan.prenom || artisan.nom
      ? `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim()
      : "Artisan");

  const imageAlt = `Portrait de l'artisan ${entreprise}`;

  const ville = artisan.ville ?? "";
  const adresse = artisan.adresse ?? "";
  const email = artisan.email ?? "";
  const telephone = artisan.telephone ?? artisan.tel ?? "";
  const description =
    artisan.a_propos ??
    artisan.description ??
    artisan.presentation ??
    "Cet artisan n’a pas encore renseigné de description.";

  const rawSpecialite =
    artisan.nom_specialite ??
    artisan?.Specialite?.nom_specialite ??
    artisan.specialite ??
    "";
  const rawCategorie =
    artisan?.Specialite?.Categorie?.nom_categorie ??
    artisan.nom_categorie ??
    "";

  const siteWeb = artisan.site_web ?? "";

  let specialite = "";
  if (typeof rawSpecialite === "string") {
    specialite = rawSpecialite;
  } else if (rawSpecialite && typeof rawSpecialite === "object") {
    specialite = rawSpecialite.nom_specialite ?? rawSpecialite.name ?? "";
  }

  // Gestion de la note
  const rawNote = artisan.note ?? artisan.note_moyenne ?? null;
  const parsedNote =
    typeof rawNote === "number"
      ? rawNote
      : rawNote
      ? parseFloat(String(rawNote).replace(",", "."))
      : null;

  const hasNote =
    typeof parsedNote === "number" && !Number.isNaN(parsedNote) && parsedNote > 0;

  const clampedNote = hasNote
    ? Math.max(0, Math.min(5, parsedNote))
    : null;
  const fullStars = hasNote ? Math.round(clampedNote) : 0;
  const emptyStars = hasNote ? 5 - fullStars : 5;
  const noteText = hasNote
    ? `${clampedNote.toFixed(1).replace(".", ",")}/5`
    : "Note non renseignée";

  const artisanId = artisan.id_artisan ?? artisan.id ?? id;

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    setSendError("");
    setSendSuccess(false);

    const trimmedPrenom = prenom.trim();
    const trimmedNom = nom.trim();
    const trimmedEmail = emailContact.trim();
    const trimmedObjet = objet.trim();
    const trimmedMessage = message.trim();

    if (!trimmedPrenom || !trimmedNom || !trimmedEmail || !trimmedObjet || !trimmedMessage) {
      setSendError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSending(true);

      const payload = {
        prenom: trimmedPrenom,
        nom: trimmedNom,
        email: trimmedEmail,
        objet: trimmedObjet,
        message: trimmedMessage,
      };

      if (artisanId) {
        payload.id_artisan = artisanId;
      }

      await sendContactMessage(payload);

      setSendSuccess(true);
      setPrenom("");
      setNom("");
      setEmailContact("");
      setObjet("");
      setMessage("");
    } catch (error) {
      console.error(
        "Erreur envoi contact depuis la fiche artisan :",
        error
      );
      setSendError(
        "Une erreur est survenue lors de l'envoi du message. Merci de réessayer plus tard."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="artisan-page">
      <div className="container">
        <header className="artisan-header mb-4">
          <div>
            <h1 className="artisan-title">{entreprise}</h1>

            {specialite && (
              <p className="artisan-specialite">{specialite}</p>
            )}

            {rawCategorie && (
              <p className="artisan-categorie">
                Catégorie : {rawCategorie}
              </p>
            )}

            {ville && <p className="artisan-ville">{ville}</p>}

            <div className="artisan-note">
              <div className="artisan-note-stars" aria-hidden="true">
                {hasNote && (
                  <>
                    {"★".repeat(fullStars)}
                    {"☆".repeat(emptyStars)}
                  </>
                )}
                {!hasNote && "☆☆☆☆☆"}
              </div>
              <p className="artisan-note-text">{noteText}</p>
            </div>
          </div>

          <div className="artisan-header-actions">
            <Link to="/artisans" className="btn artisan-back-btn">
              ← Retour à la liste
            </Link>
          </div>
        </header>

        <section className="artisan-layout">
          <div className="artisan-main">
            <img
              src={ArtisanImage}
              alt={imageAlt}
              className="artisan-image"
              loading="lazy"
            />

            <h2 className="artisan-section-title">
              À propos de cet artisan
            </h2>
            <p className="artisan-description">{description}</p>
          </div>

          <aside className="artisan-aside">
            <div className="artisan-contact-card">
              <h2 className="artisan-section-title">Coordonnées</h2>

              {adresse && (
                <p className="artisan-contact-line">
                  {adresse}
                  {ville ? (
                    <>
                      <br />
                      {ville}
                    </>
                  ) : null}
                </p>
              )}

              {!adresse && ville && (
                <p className="artisan-contact-line">{ville}</p>
              )}

              {telephone && (
                <p className="artisan-contact-line">
                  <span className="artisan-contact-label">Téléphone :</span>{" "}
                  <a href={`tel:${telephone}`}>{telephone}</a>
                </p>
              )}

              {email && (
                <p className="artisan-contact-line">
                  <span className="artisan-contact-label">Email :</span>{" "}
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              )}

              {siteWeb && (
                <p className="artisan-contact-line">
                  <span className="artisan-contact-label">Site web :</span>{" "}
                  <a
                    href={siteWeb}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {siteWeb}
                  </a>
                </p>
              )}

              <hr className="my-3" />

              <h3 className="artisan-section-title">
                Contacter cet artisan
              </h3>

              <form
                className="artisan-contact-form"
                onSubmit={handleContactSubmit}
                noValidate
              >
                <div className="mb-2">
                  <label
                    htmlFor="artisan-contact-prenom"
                    className="form-label"
                  >
                    Prénom *
                  </label>
                  <input
                    id="artisan-contact-prenom"
                    type="text"
                    className="form-control"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="artisan-contact-nom"
                    className="form-label"
                  >
                    Nom *
                  </label>
                  <input
                    id="artisan-contact-nom"
                    type="text"
                    className="form-control"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="artisan-contact-email"
                    className="form-label"
                  >
                    Email *
                  </label>
                  <input
                    id="artisan-contact-email"
                    type="email"
                    className="form-control"
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="artisan-contact-objet"
                    className="form-label"
                  >
                    Objet *
                  </label>
                  <input
                    id="artisan-contact-objet"
                    type="text"
                    className="form-control"
                    value={objet}
                    onChange={(e) => setObjet(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="artisan-contact-message"
                    className="form-label"
                  >
                    Message *
                  </label>
                  <textarea
                    id="artisan-contact-message"
                    className="form-control"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                {sendError && (
                  <p className="contact-alert contact-alert-error mt-2">
                    {sendError}
                  </p>
                )}

                {sendSuccess && (
                  <p className="contact-alert contact-alert-success mt-2">
                    Votre message a bien été envoyé. Une réponse vous sera
                    apportée sous 48h.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn artisan-contact-btn mt-2"
                  disabled={sending}
                >
                  {sending ? "Envoi en cours…" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}