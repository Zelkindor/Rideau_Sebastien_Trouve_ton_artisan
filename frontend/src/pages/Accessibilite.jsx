import Seo from "../components/Seo";

export default function Accessibilite() {
  return (
    <main className="legal-page" aria-labelledby="legal-title">
      <Seo
        title="Accessibilité — Trouve ton artisan"
        description="Déclaration d'accessibilité du site Trouve ton artisan. Page en construction, le contenu détaillé sera ajouté ultérieurement."
      />
      <div className="container py-5">
        <h1 id="legal-title" className="mb-4">Accessibilité</h1>
        <p>
          Cette page présentera la déclaration d&apos;accessibilité du site.
          Elle sera complétée ultérieurement.
        </p>
        <p>Contenu provisoire : « Page en construction ».</p>
      </div>
    </main>
  );
}