-- script_insertion.sql

-- Insertion des catégories
INSERT INTO categorie (id_categorie, nom_categorie) VALUES (1, 'Alimentation');
INSERT INTO categorie (id_categorie, nom_categorie) VALUES (2, 'Bâtiment');
INSERT INTO categorie (id_categorie, nom_categorie) VALUES (3, 'Fabrication');
INSERT INTO categorie (id_categorie, nom_categorie) VALUES (4, 'Services');

-- Insertion des spécialités
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (1, 'Bijoutier', 3);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (2, 'Boucher', 1);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (3, 'Boulanger', 1);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (4, 'Chauffagiste', 2);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (5, 'Chocolatier', 1);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (6, 'Coiffeur', 4);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (7, 'Couturier', 3);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (8, 'Electricien', 2);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (9, 'Ferronier', 3);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (10, 'Fleuriste', 4);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (11, 'Menuisier', 2);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (12, 'Plombier', 2);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (13, 'Toiletteur', 4);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (14, 'Traiteur', 1);
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES (15, 'Webdesign', 4);

-- Pour éviter un roman dans le script, on met un texte standard
SET @txt := 'Texte de présentation de l''artisan.';

-- Insertion des artisans
INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (1, 'Boucherie Dumont', 4.5, 'Lyon', @txt, 'boucherie.dumond@gmail.com', NULL, 0, 2, 1);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (2, 'Au pain chaud', 4.8, 'Montélimar', @txt, 'aupainchaud@hotmail.com', NULL, 1, 3, 1);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (3, 'Chocolaterie Labbé', 4.9, 'Lyon', @txt, 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1, 5, 1);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (4, 'Traiteur Truchon', 4.1, 'Lyon', @txt, 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0, 14, 1);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (5, 'Orville Salmons', 5.0, 'Evian', @txt, 'o-salmons@live.com', NULL, 1, 4, 2);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (6, 'Mont Blanc Eléctricité', 4.5, 'Chamonix', @txt, 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0, 8, 2);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (7, 'Boutot & fils', 4.7, 'Bourg-en-bresse', @txt, 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0, 11, 2);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (8, 'Vallis Bellemare', 4.0, 'Vienne', @txt, 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0, 12, 2);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (9, 'Claude Quinn', 4.2, 'Aix-les-bains', @txt, 'claude.quinn@gmail.com', NULL, 0, 1, 3);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (10, 'Amitee Lécuyer', 4.5, 'Annecy', @txt, 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0, 7, 3);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (11, 'Ernest Carignan', 5.0, 'Le Puy-en-Velay', @txt, 'e-carigan@hotmail.com', NULL, 0, 9, 3);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (12, 'Royden Charbonneau', 3.8, 'Saint-Priest', @txt, 'r.charbonneau@gmail.com', NULL, 0, 6, 4);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (13, 'Leala Dennis', 3.8, 'Chambéry', @txt, 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 0, 6, 4);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (14, 'C''est sup''hair', 4.1, 'Romans-sur-Isère', @txt, 'sup-hair@gmail.com', 'https://sup-hair.fr', 0, 6, 4);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (15, 'Le monde des fleurs', 4.6, 'Annonay', @txt, 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0, 10, 4);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (16, 'Valérie Laderoute', 4.5, 'Valence', @txt, 'v-laredoute@gmail.com', NULL, 0, 13, 4);

INSERT INTO artisan (id_artisan, nom, note, ville, a_propos, email, site_web, top, id_specialite, id_categorie)
VALUES (17, 'CM Graphisme', 4.4, 'Valence', @txt, 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0, 15, 4);
