---
title: Angular 2 - Découpons notre application en plusieurs composants
---

# Découpons notre application en plusieurs composants

Pour le moment, c'est notre classe AppComponent qui gère toute notre application. Par la suite, notre application va avoir de nombreuses fonctionnalités et sera difficilement maintenable. Le concept du framework Angular 2 est d'en profiter pour découper notre application en plusieurs composants, qui seront chacuns responsable d'une tache spécifique.

D'accord, allons-y, on va découper notre application.

## Créer un autre composant

Commencons par créer un composant qui sera responsable d'afficher une pizza en particulier. Créons un fichier ```pizza-detail.component.ts``` dans notre dossier ```app/```. On appellera cette classe PizzaDetailComponent.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'pizza-detail',
})
export class PizzaDetailComponent {
}
```

D'ailleurs, on en profite pour refactoriser une partie du template de AppComponent dans notre nouveau composant et on peut créer aussi une propriété pizza.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'pizza-detail',
  template: `
    <div *ngIf="pizza">
      <h2>{{pizza.name}}</h2>
      <div><label>id: </label>{{pizza.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="pizza.name" placeholder="name">
      </div>
      <div><label>price: </label>{{pizza.price}}</div>
    </div>
  `
})
export class PizzaDetailComponent {
  pizza: Pizza;
}
```

## Une classe = un fichier

Soyons consciencieux et rangeons notre classe Pizza dans un dossier ```app/models/pizza.model.ts```. D'ailleurs, cette classe va devenir une interface (Attention, c'est du TypeScript).

```js
export interface Pizza {
  id: number;
  name: string;
  price: number;
}
```

N'oublions pas d'importer la classe Pizza dans nos 2 composants.

```js
import { Pizza } from './models/pizza.model';
```

Ok Matthieu, mais comment je fais pour lier mes 2 composants maintenant ?

En fait, PizzaDetailComponent va devenir un enfant de AppComponent. On va pouvoir ajouter ce bout de code dans le template du AppComponent.

```js
<pizza-detail [pizza]="selectedPizza"></pizza-detail>
```

Vous remarquez l'attribut pizza entre crochet ? C'est ce qui va permettre d'injecter la pizza dans le four... Euh pardon dans le composant PizzaDetailComponent. Pour faire cela, on va devoir préciser que pizza est une propriété Input. On importe cette propriété à partir du noyau d'Angular et on ajoute le décorateur sur la propriété pizza de pizza-detail.

```js
import { Component, Input } from '@angular/core';
// ...
@Input() pizza: Pizza;
```

## Déclaration de nouveaux composants

La dernière étape pour que cela fonctionne est de déclarer ce nouveau composant dans le module de notre application.

```js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { PizzaDetailComponent } from './pizza-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    PizzaDetailComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Et voici le template final dans notre AppComponent.

```js
template: `
  <h1>{{title}}</h1>
  <pizza-detail [pizza]="selectedPizza"></pizza-detail>
  <h2>Les pizzas</h2>
  <ul class="pizzas">
    <li *ngFor="let pizza of pizzas"
      [class.selected]="pizza === selectedPizza"
      (click)="onSelect(pizza)">
      <span>{{pizza.id}}: {{pizza.name}}</span>
    </li>
  </ul>
  `,
```

<a href="../angular2">Retour au sommaire Angular 2</a>.