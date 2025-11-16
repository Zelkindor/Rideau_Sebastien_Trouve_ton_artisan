import { useEffect } from "react";

export default function Accessibilite() {

  useEffect(() => {
    document.title = "Accessibilité — Trouve ton artisan";
  }, []);

  return (
    <main className="legal-page container py-5">
      <h1 className="mb-4">Accessibilité</h1>
      <p>
        Cette page présentera la déclaration d&apos;accessibilité du site.
        Elle sera complétée ultérieurement.
      </p>
      <p>Contenu provisoire : « Page en construction ».</p>
    </main>
  );
}