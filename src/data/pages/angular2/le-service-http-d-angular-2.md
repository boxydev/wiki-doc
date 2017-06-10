---
title: Angular 2 - Le service HTTP d'Angular 2
---

# Le service HTTP d'Angular 2

Il existe un module nous permettant de gérer plus facilement les requêtes Ajax et surtout la connextion à une API. On va activer le HttpModule.

```js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { FrontComponent }  from './front.component';
import { PizzasComponent } from './pizzas.component';
import { PizzaDetailComponent } from './pizza-detail.component';

import { PizzaService } from './services/pizza.service';

import { AppRoutingModule } from './modules/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FrontComponent,
    PizzasComponent,
    PizzaDetailComponent
  ],
  providers: [PizzaService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

## Une fausse API pour le développement

Durant le développement de notre application, nous n'avons pas forcément d'API. Il peut être intéressant de la simuler grâce à <a target="_blank" href="https://github.com/angular/in-memory-web-api">Angular in-memory-web-api</a>. Attention, cet outil doit être utilisé uniquement en phase de développement.

On ajoute donc les imports nécessaire dans notre app.module.ts.

```js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BoxydevFakeApi }  from './services/boxydevfakeapi.service';

import { AppComponent }  from './app.component';
import { FrontComponent }  from './front.component';
import { PizzasComponent } from './pizzas.component';
import { PizzaDetailComponent } from './pizza-detail.component';

import { PizzaService } from './services/pizza.service';

import { AppRoutingModule } from './modules/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(BoxydevFakeApi),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FrontComponent,
    PizzasComponent,
    PizzaDetailComponent
  ],
  providers: [PizzaService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

On va bien entendu créer le fichier boxydevfakeapi.service.ts dans app/service.

```js
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pizza } from '../models/pizza.model';

export class BoxydevFakeApi implements InMemoryDbService {
  createDb() {
    let pizzas : Pizza[] = [
      { id: 1, name: 'Reine', price: 12 },
      { id: 2, name: '4 fromages', price: 13 },
      { id: 3, name: 'Orientale', price: 11 },
      { id: 4, name: 'Cannibale', price: 9 }
    ];
    return {pizzas};
  }
}
```

## Notre API Pizza

On peut maintenant adapter notre service pour qu'il aille chercher les informations directement dans la fausse API. On importe les classes nécessaires et on injecte le composant Http.

```js
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pizza } from '../models/pizza.model';
import { PIZZAS } from '../mocks/pizza.mock';

@Injectable()
export class PizzaService {
  constructor(private http: Http) { }
  // ...
}
```

Vous vous souvenez de la méthode getPizzas qui retourne une promesse ? On va devoir la modifier. Elle va ressembler à ça.

```js
getPizzas(): Promise<Pizza[]> {
  return this.http.get('api/pizzas')
             .toPromise()
             .then(response => response.json().data as Pizza[])
             .catch(error => {
               console.error(error);
               Promise.reject(error);
             });
}
```

La méthode toPromise est faculative dans un cas réel. De base, la méthode get de http retourne un Observable. Mais il est plus complexe à traiter qu'une promise, alors on le convertit, pour que cela soit un peu plus simple à comprendre.

## Récupérer une Pizza dans notre API

Nous avions écrit une méthode getPizza. Elle va chercher directement une correspondance avec un id dans un tableau de Pizza. C'est bien, cela fonctionne mais ce n'est pas très performant. Dans une vrai API, on aimerait faire des requêtes directement sur api/pizza/:id.

On va modifier la méthode getPizza.

```js
getPizza(id: number): Promise<Pizza> {
  return this.http.get('api/pizzas/' + id)
            .toPromise()
            .then(response => response.json().data as Pizza)
}
```

C'est presque la même chose que getPizzas sauf qu'on récupére un objet Pizza plutôt qu'un tableau d'objet Pizza. Même en ayant modifié le service, les composants fonctionnent toujours car on est resté sur une promesse.

## Modifier une Pizza

On aimerait maintenant pouvoir modifier une pizza. On va modifier notre PizzaDetailsComponent au niveau du template et on va lui ajouter une nouvelle méthode.

```js
@Component({
// ...
  template: `
    ...
    <button (click)="save()">Modifier</button>
    ...
  `
})
// ...
export class PizzaDetailComponent {
// ...
    save(): void {
      this.pizzaService.update(this.pizza)
          .then(() => this.goBack());
    }
// ...
}
```

On va créer une fonction update dans notre pizzaService.

```js
// ...
update(pizza: Pizza): Promise<Pizza> {
  return this.http.put('api/pizzas/' + pizza.id, pizza)
    .toPromise()
    .then(() => pizza)
}
// ...
```

## Et pourquoi pas ajouter une pizza ?

On pourrait également donner la possibilité à l'utilisateur d'ajouter une pizza. Rendons-nous dans notre PizzaComponent et ajoutons ce morceau d'HTML dans le template ainsi que la méthode add dans la classe.

```js
// ...
template: `
  <h2>Les pizzas</h2>
  <ul class="pizzas">
    <li *ngFor="let pizza of pizzas"
      [class.selected]="pizza === selectedPizza"
      (click)="onSelect(pizza)">
      <span>{{pizza.id}}: {{pizza.name}}</span>
      <button (click)="delete(pizza); $event.stopPropagation()">x</button>
    </li>
  </ul>
  <div>
    <label>Pizza:</label> <input #pizzaName />
    <button (click)="add(pizzaName.value); pizzaName.value=''">
      Ajouter
    </button>
  </div>
  <div *ngIf="selectedPizza">
    <h2>
      {{selectedPizza.name | uppercase}}
    </h2>
    <button (click)="gotoPizza()">Voir la pizza</button>
  </div>
`
// ...
add(name: string): void {
  if (!name) return;
  this.pizzaService.create(name)
    .then(pizza => this.pizzas.push(pizza));
}
```

Maintenant, on peut ajouter la méthode create dans le service.

```js
create(name: string): Promise<Pizza> {
  return this.http.post('api/pizzas', {name: name})
            .toPromise()
            .then(response => response.json().data as Pizza)
}
```

Et voilà, maintenant, nous pouvons ajouter des pizzas.

## Supprimer des pizzas

Il faudrait maintenant pouvoir ajouter un bouton de suppression pour chaque pizza. Comme pour la fonctionnalité d'ajout, on va commencer par modifier notre composant Pizza. Vous remarquez le stopPropagation(), il permet de ne pas executer le onSelect du li quand on clique sur le bouton de suppression.

```js
// ...
template: `
  ...
  <li *ngFor="let pizza of pizzas"
    [class.selected]="pizza === selectedPizza"
    (click)="onSelect(pizza)">
    <span>{{pizza.id}}: {{pizza.name}}</span>
    <button (click)="delete(pizza); $event.stopPropagation()">x</button>
  </li>
  ...
`
// ...
delete(pizza: Pizza): void {
  this.pizzaService.delete(pizza.id)
    .then(() => {
      this.pizzas = this.pizzas.filter(p => p !== pizza);
    });
}
```

Pour bien comprendre la méthode <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter" target="_blank">filter du prototype Array</a> en JavaScript.

Et bien sûr, on va également créer la méthode delete dans notre service de Pizza.

```js
delete(id: number): Promise<void> {
  return this.http.delete('api/pizzas/' + id)
    .toPromise()
    .then(() => null)
}
```

<a href="../angular2">Retour au sommaire Angular 2</a>.