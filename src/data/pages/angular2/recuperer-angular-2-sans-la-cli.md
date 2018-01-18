---
title: Angular 2 - Récupérer Angular 2 (Sans la CLI)
---

# Récupérer Angular 2 (Sans la CLI)

On va récupérer le code de base d'Angular 2 sans utiliser l'interface en ligne de commande. Cela nous permettra de mieux comprendre comment fonctionne le framework. Cette version n'est pas à utiliser en production mais uniquement à des fins de tests et de prototypage. <a href="https://github.com/angular/quickstart" target="_blank">Voici le github</a>.

On clone le dépôt.

```bash
git clone https://github.com/angular/quickstart ledossierdemonprojetangular2
```

On glisse dans le repertoire du projet.

```bash
cd ledossierdemonprojetangular2
```

On supprime les fichiers inutiles.

```bash
xargs rm -rf < non-essential-files.osx.txt
rm src/app/*.spec*.ts
rm non-essential-files.osx.txt
```

Pour Windows.

```bash
for /f %i in (non-essential-files.txt) do del %i /F /S /Q
rd .git /s /q
rd e2e /s /q
```

On doit donc se retrouver avec une architecture de ce genre.

```
├── bs-config.json
├── package.json
├── src
│   ├── app
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   ├── systemjs-angular-loader.js
│   ├── systemjs.config.extras.js
│   ├── systemjs.config.js
│   └── tsconfig.json
└── tslint.json
```

Maintenant, on lance un coup de ```npm install``` pour les dépendances.

```bash
npm install
```

On peut lancer le serveur de dev et on y accède via <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

```bash
npm start
```

La commande lance le transpileur en "live". Quand le code est modifié, le transpileur recompile le code TypeScript en JavaScript et rafraichit le navigateur.

[Retour au sommaire Angular 2](../angular2).
