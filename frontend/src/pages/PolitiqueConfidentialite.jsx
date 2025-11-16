import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.title = "Politique de confidentialité — Trouve ton artisan";
  }, []);

  return <div>Page confidentialité</div>;
}