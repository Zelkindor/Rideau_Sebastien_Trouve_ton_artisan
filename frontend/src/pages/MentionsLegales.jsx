import { useEffect } from "react";

export default function MentionsLegales() {

  useEffect(() => {
    document.title = "Mentions légales — Trouve ton artisan";
  }, []);

  return (
    <main className="legal-page container py-5">
      <h1 className="mb-4">Mentions légales</h1>
      <p>
        Cette page est réservée aux mentions légales. Elle sera complétée
        ultérieurement par un cabinet spécialisé.
      </p>
      <p>Contenu provisoire : « Page en construction ».</p>
    </main>
  );
}