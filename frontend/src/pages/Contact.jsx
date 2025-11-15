import { useState } from "react";
import { sendContactMessage } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      await sendContactMessage(form);
      setSuccess("Votre message a bien été envoyé. Nous vous répondrons dès que possible.");
      setForm({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
      });
    } catch (err) {
      console.error("Erreur contact API :", err);
      setError(err.message || "Une erreur est survenue lors de l'envoi du message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Contact</h1>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Téléphone</label>
          <input
            type="tel"
            className="form-control"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Sujet</label>
          <input
            type="text"
            className="form-control"
            name="sujet"
            value={form.sujet}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            rows="5"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Envoi en cours..." : "Envoyer"}
          </button>
        </div>
      </form>
    </div>
  );
}