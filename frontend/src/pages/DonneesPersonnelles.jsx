import { useEffect } from "react";

export default function DonneesPersonnelles() {
  useEffect(() => {
    document.title = "Données personnelles — Trouve ton artisan";
  }, []);

  return (
    <main className="legal-page" aria-labelledby="legal-title">
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