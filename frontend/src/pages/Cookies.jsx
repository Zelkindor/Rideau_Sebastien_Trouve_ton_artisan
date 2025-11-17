import { useEffect } from "react";

export default function Cookies() {
  useEffect(() => {
    document.title = "Cookies — Trouve ton artisan";
  }, []);

  return (
    <main className="legal-page" aria-labelledby="legal-title">
      <div className="container py-5">
        <h1 id="legal-title" className="mb-4">Cookies</h1>
        <p>
          Cette page décrira la politique d&apos;utilisation des cookies du
          site. Elle sera rédigée ultérieurement par un cabinet spécialisé.
        </p>
        <p>Contenu provisoire : « Page en construction ».</p>
      </div>
    </main>
  );
}