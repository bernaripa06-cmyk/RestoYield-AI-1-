# RestoYield AI - Guide d'Installation Locale

Cette application est un clone de l'outil d'optimisation de rendement pour restaurant avec gestion de planning intégré.

## Prérequis
- **Node.js** (version 18 ou supérieure) : [Télécharger ici](https://nodejs.org/)
- Un terminal (PowerShell, CMD, ou Terminal sur Mac)

## Installation

1. **Extraire le fichier ZIP** dans un dossier de votre choix.
2. **Ouvrir un terminal** dans ce dossier :
   - **Sur Windows** : Ouvrez le dossier, cliquez dans la barre d'adresse en haut, tapez `cmd` et faites Entrée.
   - **Sur Mac** : Faites un clic droit sur le dossier > Services > Nouvel onglet de terminal au dossier.
3. **Installer les dépendances** en tapant la commande suivante dans la fenêtre qui vient de s'ouvrir :
   ```bash
   npm install
   ```

## Configuration (Essentiel pour l'IA)

L'application a besoin d'une clé API Google Gemini pour fonctionner.
1. Créez un fichier nommé `.env` à la racine du projet (copiez le contenu de `.env.example`).
2. Ajoutez votre clé API :
   ```env
   GEMINI_API_KEY="VOTRE_CLE_ICI"
   ```
   *Vous pouvez obtenir une clé gratuite sur [Google AI Studio](https://aistudio.google.com/app/apikey).*

## Lancement

Pour démarrer l'application sur votre ordinateur :
```bash
npm run dev
```

Une fois lancée, ouvrez votre navigateur à l'adresse : `http://localhost:3000`

## Structure du projet
- `src/App.tsx` : Code principal de l'interface.
- `src/constants.ts` : Données de démonstration (Menu, Planning, Stocks).
- `src/services/geminiService.ts` : Connexion avec l'intelligence artificielle.
