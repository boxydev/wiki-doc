---
title: Ionic - Créer un projet avec Ionic
---

# Création d'un projet avec Ionic

On peut créer un projet Ionic vierge (blank) ou alors à partir d'un template (tabs, sidemenu, super ou tutorial). Mais on va le faire SANS template, sinon c'est trop easy money :)

```bash
ionic start monApplication blank
```

On peut tout de suite avoir un rendu de notre application dans le navigateur (l'option --lab est facultative mais permet un affichage sympathique de notre application) :

```bash
cd monApplication
ionic serve --lab
```

Ouvrons notre dossier monApplication dans notre éditeur de texte favori (VSC par exemple) et analysons les fichiers.
1. Le fichier config.xml va contenir toutes les informations de notre application. On peut par exemple définir une version minimale pour le SdK Android (<a href="https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html" target="_blank">Liste des versions Android</a>).
2. Le fichier package.json est classique et s'utilise avec NPM.

Maintenant, [modifions la page d'accueil de notre application](../ionic/modifier-la-page-d-accueil.html).
