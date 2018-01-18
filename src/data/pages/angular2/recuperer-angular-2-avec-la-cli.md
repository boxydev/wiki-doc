---
title: Angular 2 - Récupérer Angular 2 (Avec la CLI)
---

# Récupérer Angular 2 (Avec la CLI)

Angular CLI est un outil en ligne de commande qui va nous permettre de créer très facilement un projet Angular. Cela rendra le développement et la maintenance plus facile et rapide de nos applications.

Bien sûr, il est évident qu'il nous faut <a href="installer-node-npm-git-et-visual-studio-code.html">Node et NPM</a>.

On va installer <a href="https://github.com/angular/angular-cli" target="_blank">Angular CLI</a> de manière globale via NPM.

```bash
npm install -g @angular/cli
```

Pour créer un nouveau projet, on se rend dans le dossier de nos projets et on peut taper.

```bash
ng new pizzaparty
```

On peut ensuite se rendre dans le dossier et lancer le serveur de développement en ouvrant le navigateur.

```bash
cd pizzaparty
ng serve --open
```

<a href="../angular2">Retour au sommaire Angular 2</a>.
