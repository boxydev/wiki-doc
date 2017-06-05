---
title: Angular 2 - Le composant de notre application Angular 2
---

# Le composant de notre application Angular 2

On peut commencer à coder très rapidement en ouvrant le fichier ```src/app/app.component.ts```. Essayons d'écrire ce code et regardons le résultat.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1><h2>{{name}}</h2>`,
})
export class AppComponent {
  title = 'Mon super site avec Angular 2';
  name = '4 fromages';
}
```

## Ranger dans une classe

Je peux créer une classe Pizza qui me permettra de stocker plus d'informations qu'une simple String ! Une classe n'est rien d'autre qu'un simple objet JavaScript !

On en profite également pour formater notre code sur plusieurs lignes afin qu'il soit plus lisible.

```js
import { Component } from '@angular/core';

export class Pizza {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{pizza.name}}</h2>
    <div><label>id: </label>{{pizza.id}}</div>
    <div><label>name: </label>{{pizza.name}}</div>
    <div><label>price: </label>{{pizza.price}}</div>
  `,
})
export class AppComponent {
  title = 'Mon super site avec Angular 2';
  pizza: Pizza = {
    id: 1,
    name: 'Reine',
    price: 12
  }
}
```

## Le module de formulaire

Ajoutons tout de suite un ```<input>``` nous permettant de modifier le nom de la pizza. ```[(ngModel)]``` nous permet de lier la valeur de pizza.name à l'input.

```html
<div>
  <label>name: </label>
  <input [(ngModel)]="pizza.name" placeholder="name">
</div>
```

Et là, c'est le drame. On se retouve avec un site qui ne fonctionne plus. Si on observe la console du navigateur, on remarque cette erreur ```Can't bind to 'ngModel' since it isn't a known property of 'input'```.

En fait, c'est tout à fait normal. La gestion des formulaires sous Angular 2 fonctionne grâce au module FormsModule qu'il faut activer.

Pour importer le module, il faut éditer le fichier ```app.module.ts``` et importer le FormsModule à partir de la bibliothéque ```@angular/forms```. Le fichier doit maintenant ressembler à ça.

```js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Maintenant, cela devrait fonctionner. Essayez de changer le contenu de l'input.

<a href="../angular2">Retour au sommaire Angular 2</a>.