import Seo from "../components/Seo";

export default function DonneesPersonnelles() {
  return (
    <main className="legal-page" aria-labelledby="legal-title">
      <Seo
        title="Données personnelles — Trouve ton artisan"
        description="Informations sur le traitement des données personnelles sur le site Trouve ton artisan. Contenu provisoire en attente de rédaction définitive."
      />
      <div className="container py-5">
        <h1 id="legal-title" className="mb-4">Données personnelles</h1>
        <p>
          Cette page détaillera les informations relatives au traitement des
          données personnelles. Elle sera rédigée ultérieurement par un
          cabinet spécialisé.
        </p>
        <p>Contenu provisoire : « Page en construction ».</p>
      </div>
    </main>
  );
}