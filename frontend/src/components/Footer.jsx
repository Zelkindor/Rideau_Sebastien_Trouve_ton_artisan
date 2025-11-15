// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // même logo que dans le header

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Partie bleu principale */}
      <div className="site-footer-top">
        <div className="container site-footer-top-inner">
          {/* Bloc gauche : logo + texte */}
          <div className="site-footer-brand">
            <img
              src={logo}
              alt="Trouve ton artisan"
              className="site-footer-logo"
            />
            <div>
              <p className="site-footer-brand-line">
                Trouve ton artisan !
              </p>
              <p className="site-footer-brand-subline">
                Une plateforme de la région Auvergne-Rhône-Alpes pour mettre
                en avant les artisans locaux et faciliter la prise de contact
                avec le public.
              </p>
            </div>
          </div>

          {/* Bloc droite : adresse Lyon */}
          <div className="site-footer-region">
            <h2 className="site-footer-region-title">Lyon</h2>
            <p className="site-footer-region-text">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <br />
              +33 (0)4 26 73 40 00
            </p>
          </div>
        </div>
      </div>

      {/* Barre du bas : liens légaux + copyright */}
      <div className="site-footer-bottom">
        <div className="container site-footer-bottom-inner">
          <nav aria-label="Pages légales" className="site-footer-legal-nav">
            <ul className="site-footer-legal-list">
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/donnees-personnelles">
                  Données personnelles
                </Link>
              </li>
              <li>
                <Link to="/accessibilite">Accessibilité</Link>
              </li>
              <li>
                <Link to="/cookies">Politique des cookies</Link>
              </li>
            </ul>
          </nav>

          <div className="site-footer-copy">
            © {year} Région Auvergne-Rhône-Alpes – Trouve ton artisan.
          </div>
        </div>
      </div>
    </footer>
  );
}