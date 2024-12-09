# 🚀 ULB Stages Attribution

## Description

ULB Stages Attribution est une application web développée avec **Next.js** pour gérer l'attribution des stages étudiants à l'Université Libre de Bruxelles (ULB). Elle permet aux utilisateurs de consulter, attribuer, et gérer les données liées aux stages, aux préférences des étudiants, et aux places disponibles.

---

## 📋 Fonctionnalités

### 📝 Gestion des Données

- **Classements** : Voir la liste des classements des étudiants.
- **Places** : Consulter les places disponibles dans différents hôpitaux et services.
- **Services** : Explorer les services associés aux stages.
- **Hôpitaux** : Visualiser la liste des hôpitaux partenaires.
- **Stages** : Gérer les stages attribués aux étudiants.

### ⚙️ Attribution des Stages

- Attribution automatique des stages inspiré l'algorithme de **Gale-Shapley** pour respecter les préférences des étudiants.
- Gestion des exclusions et des contraintes.

### 🌟 Pages Détails

- Afficher les détails des entités (services, hôpitaux, stages, classements, préférences).

### 🔄 Pagination

- Pagination intégrée pour naviguer facilement à travers de larges ensembles de données.

### 💾 CRUD (Create, Read, Update, Delete)

- **Création automatique des stages** via un bouton.
- **Suppression** de stages à l’unité ou en bulk.

## 📦 Installation

### Prérequis

- **Node.js** (v18+ recommandé)
- **npm** ou **yarn**

### Étapes

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-repo/ulb-stages-attribution.git
   cd ulb-stages-attribution
   ```
2. Installez les dépendances :

   ```bash
   npm install
   # ou
   yarn install

   ```

3. Configurez les variables d'environnement : Créez un fichier .env.local à la racine et ajoutez les variables suivantes :
   ```env
   API_URL=https://codeval.polesante.ulb.be
   API_AUTH_TOKEN=<your-token-with-escaped-with-slash-for-special-char>
   NEXT_PUBLIC_API_URL=<the-link-for-the-nextjs-api>
   ```
4. Lancez l'application en mode développement :

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Accédez à l'application sur http://localhost:3000.

## 📂 Structure des Dossiers

```graphql
   📦 src
   ├── 📁 app # Pages principales de l'application et routes API
   │   ├── 📁 api # Routes API (stages, places, etc.)
   │   ├── 📁 stages # Exemple d'une page dédiée (e.g., /stages)
   │   ├── 📁 preferences # Exemple d'une page dédiée (e.g., /preferences)
   │   ├── 📁 services # Exemple d'une page dédiée (e.g., /services)
   │   ├── 📁 hopitals # Exemple d'une page dédiée (e.g., /hopitals)
   ├── 📁 components # Composants réutilisables (Pagination, Header, etc.)
   ├── 📁 lib # Bibliothèques utilitaires (API client, etc.)
   ├── 📁 utils # Fonctions utilitaires pour les appels API
   ├── 📁 types # Types TypeScript globaux
   │   ├── 📁 api # Types spécifiques à l'API (Stage, Place, etc.)
```

## 🔧 Technologies Utilisées

### 🌐 Frontend

- Next.js 15 : Framework React pour les applications web.
- React : Bibliothèque JavaScript pour les interfaces utilisateur.
- Tailwind CSS : Framework CSS pour un style rapide et réactif.

### 🌍 API & Backend

API RESTful : Intégration avec une API distante pour la gestion des données.
https://codeval.polesante.ulb.be/

### 🛠️ Outils de Développement

TypeScript : Typage statique pour un développement sécurisé.
ESLint : Linting pour un code propre et cohérent.
Prettier : Formatage automatique du code.

## 📖 Documentation des Pages

### 🌍 Pages Principales

| Route             | Description                                          |
| ----------------- | ---------------------------------------------------- |
| /                 | Redirige vers /stages.                               |
| /stages           | Liste des stages avec pagination.                    |
| /stages/[id]      | Détails d’un stage spécifique.                       |
| /places           | Liste des places disponibles avec pagination.        |
| /places/[id]      | Détails d’une place spécifique.                      |
| /services         | Liste des services avec pagination.                  |
| /services/[id]    | Détails d’un service spécifique.                     |
| /hopitals         | Liste des hôpitaux avec pagination.                  |
| /hopitals/[id]    | Détails d’un hôpital spécifique.                     |
| /classements      | Liste des classements des étudiants avec pagination. |
| /classements/[id] | Détails d’un classement spécifique.                  |
| /preferences      | Liste des preferences des étudiants avec pagination. |
| /preferences/[id] | Détails d’une preferences ou exclusion spécifique.   |

### 🛠 Routes API

| Méthode | Route               | Description                                        | Paramètres Optionnels                            |
| ------- | ------------------- | -------------------------------------------------- | ------------------------------------------------ |
| GET     | `/classements`      | Récupère la liste des classements paginée.         | `page` : numéro de page (par défaut `1`).        |
| GET     | `/preferences`      | Récupère la liste des préférences paginée.         | `page` : numéro de page (par défaut `1`).        |
| GET     | `/places`           | Récupère la liste des places paginée.              | `page` : numéro de page (par défaut `1`).        |
| GET     | `/stages`           | Récupère la liste des stages paginée.              | `page` : numéro de page (par défaut `1`).        |
| GET     | `/services`         | Récupère la liste des services paginée.            | `page` : numéro de page (par défaut `1`).        |
| GET     | `/hopitals`         | Récupère la liste des hôpitaux paginée.            | `page` : numéro de page (par défaut `1`).        |
| GET     | `/classements/[id]` | Récupère les détails d'un classement.              | _Aucun_                                          |
| GET     | `/preferences/[id]` | Récupère les détails d'une préférence.             | _Aucun_                                          |
| GET     | `/places/[id]`      | Récupère les détails d'une place.                  | _Aucun_                                          |
| GET     | `/stages/[id]`      | Récupère les détails d'un stage.                   | _Aucun_                                          |
| GET     | `/services/[id]`    | Récupère les détails d'un service.                 | _Aucun_                                          |
| GET     | `/hopitals/[id]`    | Récupère les détails d'un hôpital.                 | _Aucun_                                          |
| POST    | `/stages`           | Attribue automatiquement les stages aux étudiants. | _Aucun_                                          |
| DELETE  | `/stages`           | Supprime des stages en masse.                      | Corps de la requête : tableau d'IDs à supprimer. |
| DELETE  | `/stages/clear`     | Supprime tous les stages.                          | _Aucun_                                          |
| GET     | `/stages/[id]`      | Récupère les détails d'un stage spécifique.        | _Aucun_                                          |
| DELETE  | `/stages/[id]`      | Supprime un stage spécifique.                      | _Aucun_                                          |

## 🔒 Licence

Ce projet est sous licence MIT.
