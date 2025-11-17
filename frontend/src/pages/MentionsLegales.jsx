import Seo from "../components/Seo";

export default function MentionsLegales() {
  return (
    <main className="legal-page" aria-labelledby="legal-title">
      <Seo
        title="Mentions légales — Trouve ton artisan"
        description="Mentions légales du site Trouve ton artisan pour la région Auvergne-Rhône-Alpes. Contenu provisoire en attente de validation."
      />
      <div className="container py-5">
        <h1 id="legal-title" className="mb-4">Mentions légales</h1>
        <p>
          Cette page est réservée aux mentions légales. Elle sera complétée
          ultérieurement par un cabinet spécialisé.
        </p>
        <p>Contenu provisoire : « Page en construction ».</p>
      </div>
    </main>
  );
}