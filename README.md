# Trouve ton artisan – Plateforme région Auvergne-Rhône-Alpes

Projet réalisé dans le cadre d’une évaluation professionnelle visant à développer
une plateforme permettant de rechercher des artisans locaux, consulter leurs fiches
et les contacter facilement.

Le projet respecte l’ensemble du **brief officiel**, incluant :
- maquettes multi-support (mobile / desktop),
- frontend en **ReactJS + Bootstrap + Sass**,
- backend en **Node.js + Express + Sequelize + MySQL**,
- base de données relationnelle complète,
- filtrage des artisans par catégorie,
- système de recherche,
- fiche artisan détaillée,
- pages légales,
- formulaire de contact relié à une base de données + envoi d’email,
- accessibilité & bonnes pratiques UI.

---

## Sommaire
- [Aperçu du projet](#aperçu-du-projet)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture du dépôt](#architecture-du-dépôt)
- [Base de données](#base-de-données)
- [Installation & lancement](#installation--lancement)
  - [1. Backend (API)](#1-backend-api)
  - [2. Frontend (React)](#2-frontend-react)
- [Variables d'environnement](#variables-denvironnement)
- [Routes API](#routes-api)
- [Sécurité](#sécurité)
- [Déploiement](#déploiement)
- [Crédits & auteur](#crédits--auteur)

---

## Aperçu du projet

La plateforme permet aux utilisateurs de :

- parcourir les catégories d’artisans,
- filtrer les résultats,
- consulter une fiche artisan (photo, métier, catégorie, ville, note, description, coordonnées),
- envoyer un message via un formulaire de contact,
- accéder aux pages légales (Mentions, Données perso, Accessibilité, Cookies),
- bénéficier d’un affichage responsive conforme aux maquettes,
- accéder aux *3 artisans du mois* (mise en avant).

---

## Fonctionnalités principales

### Frontend
- Navigation dynamique basée sur l’API.
- Recherche d’artisans par nom / entreprise.
- Filtre par catégorie.
- Fiche artisan complète.
- Formulaire de contact (lié API).
- Pages légales (texte placeholder selon brief).
- Page 404 personnalisée.
- SEO (title + meta descriptions dynamiques).
- Responsive mobile-first.

### Backend
- API REST complète.
- Gestion des catégories, spécialités, artisans.
- Gestion du contact :
  - validation stricte des données,
  - enregistrement en base,
  - envoi d’email via Mailtrap.
- Sécurisation via Helmet + validation serveur.
- Sequelize (ORM) avec relations complètes.
- Scripts SQL création + insertion.

---

## Technologies utilisées

### Frontend
- React 19
- React Router 7
- Bootstrap 5.3
- Sass
- Vite

### Backend
- Node.js 20+
- Express.js
- Sequelize
- MySQL 8
- Nodemailer
- Helmet
- Dotenv

### Outils / Autres
- Mailtrap (environnement de test email)
- GitHub
- Render / Vercel (déploiement)
- Figma (maquettes)

---

## Architecture du dépôt

trouve_ton_artisan/
│ README.md
│
├── api/
│ ├── src/
│ │ ├── app.js
│ │ ├── server.js
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── services/
│ ├── package.json
│ └── .env.example
│
├── bdd/
│ ├── script_creation.sql
│ └── script_insertion.sql
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── styles/
│ ├── main.jsx
│ ├── App.jsx
│ └── index.html
├── package.json
└── .env.example

---

## Base de données

Base MySQL : `trouve_ton_artisan`

### Tables principales
- `categorie`
- `specialite`
- `artisan`
- `message_contact`

### Relations
- 1 catégorie → plusieurs spécialités  
- 1 catégorie → plusieurs artisans  
- 1 spécialité → plusieurs artisans  
- 1 artisan → plusieurs messages  

### Scripts fournis
- `script_creation.sql`
- `script_insertion.sql`

---

## Installation & lancement

### 1. Backend (API)

cd api
npm install

Créer un fichier .env :
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=

MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=
MAILTRAP_PASS=
MAILTRAP_FROM="Trouve ton artisan <no-reply@trouvetonartisan.fr>"
MAILTRAP_FALLBACK_TO=

Puis :
npm start

API accessible sur :
http://localhost:3001

### 2. Frontend (API)

cd frontend
npm install

Créer le fichier .env.local :
VITE_API_BASE_URL=http://localhost:3001

Puis lancer :
npm run dev

## Variables d’environnement

### Backend (api/.env)

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- MAILTRAP_*
- PORT (optionnel)

### Frontend (frontend/.env.local)

- VITE_API_BASE_URL

## Routes API

### Catégories

GET /categories

### Artisans

GET /artisans
GET /artisans/:id


### Filtres disponibles :

- categoryId (frontend)
- id_categorie (backend)
- limit
- page
- top

⚠️ Remarque : sur cette version, le filtrage détaillé côté serveur n’est pas exploité par le frontend, comme expliqué dans le dossier PDF.

### Contact

POST /contact

Payload attendu :

{
  "nom_expediteur": "",
  "email_expediteur": "",
  "objet": "",
  "contenu_message": "",
  "id_artisan": null
}

## Sécurité

- Helmet activé sur l’API
- Validation stricte du formulaire de contact
- ORM Sequelize → évite injections SQL
- Champs email validés
- CORS configurable selon environnement
- Variables sensibles externalisées (.env)
- Pas de données personnelles stockées côté frontend

## Déploiement

### API — Render

- Ajouter un fichier .env dans Render Dashboard
- Configurer le CORS :
origin: https://votre-domaine-front.com
- Build command : (aucune)
- Start command :

node src/server.js

### Frontend — Vercel / Netlify

- Ajouter l’environnement :
VITE_API_BASE_URL=https://votre-api.render.com


- Lancer le build :
npm run build

## Crédits & auteur

Projet réalisé par Sébastien Rideau, dans le cadre d’une évaluation professionnelle complète comprenant :

- conception Figma,
- modélisation BDD,
- API Node/Express/Sequelize,
- développement ReactJS,
- mise en place d’un système de contact,
- optimisation accessibilité & SEO,
- rapport PDF final.