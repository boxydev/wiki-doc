---
title: Cordova - Créer un projet avec Cordova
---

# Création d'un projet avec Cordova

Nous allons maintenant créer notre premier projet avec Cordova. Attention, il ne faut pas avoir peur de la ligne de commande.
La commande ci-dessous peut nous aider à comprendre la commande de création de projet intégré à la CLI.

```bash
cordova help create
```

Pour le moment, l'argument le plus important sera le path, autrement dit, le dossier de notre projet. On va se déplacer dans le dossier de nos projets.

```bash
cd ~/MesProjets
cordova create maPremiereAppCordova
```

Il est nécessaire de déclarer au moins une plateforme pour faire fonctionner l'application. Une plateforme est simplement un périphérique sur lequel on veut faire fonctionner notre application. Dans un cas classique mobile, ce serait iOS ou Android. Mais cela peut également être une application Windows (Windows Store).
Pour commencer au plus simple et au plus rapide, nous allons ajouter la plateforme Browser, qui concerne le navigateur web.

```bash
cd maPremiereAppCordova
cordova platform add browser
```

Une fois que la plateforme est ajoutée, on peut lancer l'application.

```bash
cordova run browser
```

Super ! Notre application fonctionne bien. Maintenant, comment faire pour choisir la plateforme Android ? Nous allons voir dans le [chapitre suivant](la-plateforme-android.html).
