-- script_creation.sql

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
  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (id_specialite)
    REFERENCES specialite(id_specialite)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_artisan_categorie
    FOREIGN KEY (id_categorie)
    REFERENCES categorie(id_categorie)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

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