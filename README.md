## Points de Boucle dans le Projet

Ce projet comprend plusieurs points de boucle importants qui sont essentiels au bon fonctionnement des fonctionnalités. Voici une vue d'ensemble de ces points de boucle :

### 1. Boucle d'Authentification

- **Emplacement du Code** : `src/authentication/AuthService.js`
- **Description** : Gère l'authentification des utilisateurs via Firebase. Cette boucle vérifie régulièrement l'état de l'utilisateur et ajuste les permissions en conséquence.
- **Points Clés** :
  - Vérification du statut de connexion
  - Gestion des erreurs d'authentification
  - Mise à jour de l'état de l'utilisateur

### 2. Boucle de Suivi des Séances d'Entraînement

- **Emplacement du Code** : `src/components/TrainingTracker.jsx`
- **Description** : Assure le suivi en temps réel des séances d'entraînement, y compris l'enregistrement manuel et automatique des données d'entraînement.
- **Points Clés** :
  - Collecte des données des capteurs (GPS, accéléromètre)
  - Enregistrement des données dans la base de données
  - Mise à jour de l'interface utilisateur avec les données en temps réel

### 3. Boucle de Définition des Objectifs

- **Emplacement du Code** : `src/components/Goals.jsx`
- **Description** : Permet aux utilisateurs de définir et de suivre leurs objectifs de fitness. Cette boucle gère la création, la mise à jour et l'affichage des objectifs.
- **Points Clés** :
  - Création d'un nouvel objectif
  - Mise à jour des objectifs existants
  - Affichage des objectifs sur la page d'accueil

### 4. Boucle de Notification

- **Emplacement du Code** : `src/components/Notifications.jsx`
- **Description** : Gère l'envoi et l'affichage des notifications push pour les rappels et les alertes liés aux objectifs et aux séances d'entraînement.
- **Points Clés** :
  - Envoi de notifications push via Firebase
  - Affichage des notifications dans l'application
  - Gestion des préférences de notification de l'utilisateur

### 5. Boucle de Visualisation des Statistiques

- **Emplacement du Code** : `src/components/Statistics.jsx`
- **Description** : Génère et affiche des graphiques et des statistiques basés sur les données d'entraînement et les objectifs des utilisateurs.
- **Points Clés** :
  - Génération des graphiques avec les données
  - Mise à jour dynamique des statistiques
  - Affichage des tendances et des performances

---

## Documents du Projet

- [Document de Projet](docs/Document%20de%20Projet%20Fitness.pdf)
- [Document d'Analyse et de Conception](docs/Document%20d'analyse%20et%20conception.pdf)
- [Document Technique](docs/)
- [Rapport des Tests](docs/Rapport%20des%20Tests.pdf)
- [Rapport d'analyse](docs/)
- [Script de la base De donnees MongoDB](/Script%20Creation%20DB.txt)