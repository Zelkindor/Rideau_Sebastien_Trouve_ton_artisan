-- script_creation.sql

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Table des catégories
CREATE TABLE categorie (
  id_categorie INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom_categorie VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- Table des spécialités
CREATE TABLE specialite (
  id_specialite INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom_specialite VARCHAR(100) NOT NULL,
  id_categorie INT UNSIGNED NOT NULL,

  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (id_categorie)
    REFERENCES categorie(id_categorie)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Index pour optimiser les jointures sur la clé étrangère
CREATE INDEX idx_specialite_id_categorie
  ON specialite (id_categorie);

-- Table des artisans
CREATE TABLE artisan (
  id_artisan INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  note DECIMAL(2,1) NOT NULL,
  ville VARCHAR(100) NOT NULL,
  a_propos TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  site_web VARCHAR(255) NULL,
  top TINYINT(1) NOT NULL DEFAULT 0,
  id_specialite INT UNSIGNED NOT NULL,
  id_categorie INT UNSIGNED NOT NULL,

  -- Contraintes de clés étrangères
  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (id_specialite)
    REFERENCES specialite(id_specialite)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_artisan_categorie
    FOREIGN KEY (id_categorie)
    REFERENCES categorie(id_categorie)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  -- Contrainte d'unicité sur l'email des artisans
  CONSTRAINT uq_artisan_email UNIQUE (email)
) ENGINE=InnoDB;

-- Index pour optimiser les jointures sur les clés étrangères
CREATE INDEX idx_artisan_id_specialite
  ON artisan (id_specialite);

CREATE INDEX idx_artisan_id_categorie
  ON artisan (id_categorie);

-- Table des messages de contact
CREATE TABLE message_contact (
  id_message INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom_expediteur VARCHAR(150) NOT NULL,
  email_expediteur VARCHAR(255) NOT NULL,
  contenu_message TEXT NOT NULL,
  id_artisan INT UNSIGNED NULL,
  id_specialite INT UNSIGNED NULL,
  id_categorie INT UNSIGNED NULL,

  CONSTRAINT fk_message_artisan
    FOREIGN KEY (id_artisan)
    REFERENCES artisan(id_artisan)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

  CONSTRAINT fk_message_specialite
    FOREIGN KEY (id_specialite)
    REFERENCES specialite(id_specialite)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

  CONSTRAINT fk_message_categorie
    FOREIGN KEY (id_categorie)
    REFERENCES categorie(id_categorie)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- Index pour optimiser les jointures sur les clés étrangères
CREATE INDEX idx_message_id_artisan
  ON message_contact (id_artisan);

CREATE INDEX idx_message_id_specialite
  ON message_contact (id_specialite);

CREATE INDEX idx_message_id_categorie
  ON message_contact (id_categorie);
