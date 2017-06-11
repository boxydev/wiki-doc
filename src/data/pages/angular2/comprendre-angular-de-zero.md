---
title: Angular 2 - Comprendre Angular de zéro
---

# Comprendre Angular de zéro

On peut créer une application Angular en partant de rien. Cela permet de bien comprendre les entrailles du framework. Pour commencer, on va installer TypeScript.

```bash
npm install -g typescript
```

On va créer un dossier ```angularfs/``` et se mettre dedans. On va générer un fichier tsconfig.json avec des options pour la compilation TypeScript. On précise donc qu'on veut les sourcemaps (debug), un code en es5 et les décorateurs.

```bash
tsc --init --target es5 --sourceMap --experimentalDecorators --emitDecoratorMetadata
```

On peut créer un package.json pour notre application.

```bash
npm init
```

On va enfin installer Angular ainsi que toutes ses dépendances.

```bash
npm install --save @angular/core @angular/compiler @angular/common @angular/platform-browser @angular/platform-browser-dynamic rxjs reflect-metadata zone.js
```

Maintenant, on peut créer un app.component.ts et lancer ```tsc --watch```

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app'
})
export class AppComponent {

}
```

On va maintenant créer un module Angular racine pour notre application. Créons le fichier ```app.module.ts```.

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
```

Ici, on importe le décorateur NgModule, on importe aussi le BrowserModule car nous créons ici une application web. On déclare notre composant App et bien sûr on bootstrap l'application dessus.

Maintenant, on va créer un fichier ```main.ts```

```js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

Ensuite, on va pouvoir créer le fichier index.html. Mais avant, on va devoir installer systemjs car les navigateurs ES5 ne supportent pas la notion de modules.

```bash
npm i -D systemjs
```

```html
<html>

<head>
  <script src="node_modules/zone.js/dist/zone.js"></script>
  <script src="node_modules/reflect-metadata/Reflect.js"></script>
  <script src="node_modules/systemjs/dist/system.js"></script>
  <script>
    System.config({
      // the app will need the following dependencies
      map: {
        '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
        '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        'rxjs': 'node_modules/rxjs'
      },
      packages: {
        // we want to import our modules without writing '.js' at the end
        // we declare them as packages and SystemJS will add the extension for us
        '.': {}
      }
    });
    // and to finish, let's boot the app!
    System.import('main');
  </script>
</head>

<body>
  <app>
    Loading...
  </app>
</body>

</html>
```

On peut installer http-server via npm pour tester le rendu très rapidement.

```
npm i -g http-server
http-server -p 1234
```

Cette partie nous permet de comprendre comment est construit Angular 2. Pour démarrer un vrai projet, il vaut mieux démarrer avec <a href="recuperer-angular-2-avec-la-cli.html">Angular CLI</a>.