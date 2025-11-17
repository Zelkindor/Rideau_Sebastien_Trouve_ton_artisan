import Seo from "../components/Seo";

export default function Cookies() {
  return (
    <main className="legal-page" aria-labelledby="legal-title">
      <Seo
        title="Cookies — Trouve ton artisan"
        description="Informations sur l'utilisation des cookies sur le site Trouve ton artisan. Contenu provisoire en attente de validation."
      />
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