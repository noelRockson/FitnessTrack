# FitnessTrack
Une application Web et mobile de suivi de fitness permettant aux utilisateurs de suivre leurs activités physiques, de définir des objectifs personnels, et de consulter des statistiques sur leurs progrès et offrir une expérience utilisateur fluide.
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

Pour toute question ou clarification supplémentaire, veuillez consulter les fichiers source correspondants ou contacter l'équipe de développement.
