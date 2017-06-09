---
title: Angular 2 - Créer un système de route avec Angular 2
---

# Créer un système de route avec Angular 2

On voit qu'Angular 2 est un framework JavaScript très puissant. Mais on veut faire une application web ou un site web, et du coup, on a besoin de faire plusieurs pages HTML, comment fait-on ? Puisqu'on part d'un fichier index.html seul.

Et bien, pas besoin de créer d'autres fichiers HTML, Angular nous propose un module nous permettant de gérer nos routes. Une route = Un composant. Et notre composant principal AppComponent, va devenir le routeur qui redirige vers le bon composant.

## Séparer notre AppComponent dans PizzaComponent

Pour bien nous organiser, nous allons commencer par migrer en grande partie notre AppComponent dans PizzaComponent. Ce dernier sera responsable d'afficher la liste de nos pizzas. Notre PizzaComponent doit ressembler à cela.

```js
import { Component, OnInit } from '@angular/core';
import { Pizza } from './model/pizza';
import { PizzaService } from './service/pizza.service';

@Component({
  selector: 'pizzas',
  template: `
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
  styles: [`
    .pizzas li:hover {
      cursor: pointer;
    }
  `],
  providers: [PizzaService]
})

export class PizzasComponent implements OnInit {
  pizzas: Pizza[];
  selectedPizza: Pizza;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.pizzaService.getPizzas().then(pizzas => this.pizzas = pizzas);
  }

  onSelect(pizza: Pizza): void {
    this.selectedPizza = pizza;
  }
}
```

Et voici notre nouveau AppComponent, beaucoup plus léger.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <pizzas></pizzas>
  `
})
export class AppComponent {
  title = 'Mon super site avec Angular 2';
}
```

Bien entendu, on oublie pas de déclarer le nouveau composant dans le app.module.ts.

```js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { PizzasComponent } from './pizzas.component';
import { PizzaDetailComponent } from './pizza-detail.component';

import { PizzaService } from './service/pizza.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    PizzasComponent,
    PizzaDetailComponent
  ],
  providers: [PizzaService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

```

## Module de routes

On va maintenant pouvoir utiliser le module de routes d'Angular 2, RouterModule. On va déjà s'assurer d'avoir ```<base href="/">``` dans le ```<head>``` de notre fichier html.

On peut installer le module dans notre app.module.ts. On en profite pour créer une page /pizzas dans laquelle on chargera le composant PizzasComponent.

```js
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    // ...  
    RouterModule.forRoot([
      {
        path: 'pizzas',
        component: PizzasComponent
      }
    ])
    // ...
  ],
  // ...
})
```

Maintenant, on ajoute le ```<router-outlet></router-outlet>``` dans le AppComponent.

```js
template: `
  <h1>{{title}}</h1>
  <a routerLink="/pizzas">Pizzas</a>
  <router-outlet></router-outlet>
`
```

## La partie front

On va créer un nouveau composant qui affichera la liste de nos pizzas mais côté front pour l'utilisateur. Pour le moment, notre PizzaComponent est plus adapté pour la gestion de nos pizzas. On va donc créer un FrontComponent.

```js
import { Component } from '@angular/core';
@Component({
  selector: 'front',
  template: '<h2>Home Page</h2>'
})
export class FrontComponent { }
```

On va ajouter le nouveau composant ainsi que la nouvelle route dans notre app.module.ts.

```js
import { FrontComponent } from './front.component';
// ...
{
  path: '',
  component: FrontComponent
},
// ...
declarations: [
  // ...
  FrontComponent,
  // ...
],
// ...
```

Et voici le template de notre AppComponent.

```js
template: `
  <h1>{{title}}</h1>
  <nav>
    <a routerLink="/">Accueil</a>
    <a routerLink="/pizzas">Pizzas</a>
  </nav>
  <router-outlet></router-outlet>
`
```

## Afficher les pizzas dans la partie front

On veut maintenant récupérer les pizzas dans ce composant. Pour faire cela, on va utiliser notre service Pizza. On va implémenter la méthode ngOnInit.

```js
import { Component, OnInit } from '@angular/core';
import { Pizza } from './model/pizza';
import { PizzaService } from './service/pizza.service';
// ...
@Component({
  // ...
  template: `
    <h2>Home Page</h2>
    <div *ngFor="let pizza of pizzas">
      {{ pizza.name }}
    </div>
  `
})
export class FrontComponent implements OnInit {
  pizzas: Pizza[] = [];
  
  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.pizzaService.getPizzas()
      .then(pizzas => this.pizzas = pizzas);
  }
}
``` 

## Une route par Pizza

Il pourrait être intéressant d'avoir des routes dynamiques du genre /pizza/ID. On va commencer par définir la route dans le module.

```js
{
  path: 'pizza/:id',
  component: PizzaDetailComponent
}
```

Maintenant, on va modifier notre PizzaDetailComponent. On va utiliser notre service Pizza et pour éviter de le déclarer dans chaque composant en tant que provider, on peut le déclarer de manière globale dans le fichier app.module.ts.

```js
import { Component, Input, OnInit } from '@angular/core';
import { Pizza } from './model/pizza';

import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { PizzaService } from './service/pizza.service';

import 'rxjs/add/operator/switchMap';

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
export class PizzaDetailComponent implements OnInit {
  @Input() pizza: Pizza;

  constructor(
    private pizzaService: PizzaService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.pizzaService.getPizza(+params['id']))
      .subscribe(
        pizza => this.pizza = pizza
      );
  }
}
```

Prenons le temps de bien comprendre ce qu'est une Promesse et un Observable. Bien sûr, on ajoute une méthode getPizza dans notre service.

```js
getPizza(id: number): Promise<Pizza> {
  return this.getPizzas()
             .then(pizzas => pizzas.find(pizza => pizza.id === id))
}
```

Ajoutons un lien dans le template du FrontComponent pour chaque pizza.

```js
<div *ngFor="let pizza of pizzas">
  <a [routerLink]="['/pizza', pizza.id]">{{pizza.name}}</a>
</div>
```

Maintenant, offrons la possibilité à l'utilisateur de revenir en arrière quand il est sur une pizza.

```js
// ...
template: `
  <div *ngIf="pizza">
    <h2>{{pizza.name}}</h2>
    <div><label>id: </label>{{pizza.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="pizza.name" placeholder="name">
    </div>
    <div><label>price: </label>{{pizza.price}}</div>
    <button (click)="goBack()">Retour</button>
  </div>
`
// ...
goBack(): void {
  this.location.back();
}
```

## Refactorisons nos routes dans un module Routing

Alors nous pouvons maintenant gérer nos routes très facilement. Le soucis est qu'au bout d'un certain temps, notre application va grandir et nous aurons de nombreuses routes. Nous allons donc créer un module spécifique aux routes. Créons un fichier app-routing.module.ts dans le dossier app/module

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontComponent }  from '../front.component';
import { PizzasComponent } from '../pizzas.component';
import { PizzaDetailComponent } from '../pizza-detail.component';

const routes: Routes = [
  { path: '', component: FrontComponent },
  { path: 'pizzas', component: PizzasComponent },
  { path: 'pizza/:id', component: PizzaDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

On peut maintenant adapter le fichier app.module.ts.

```js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { FrontComponent }  from './front.component';
import { PizzasComponent } from './pizzas.component';
import { PizzaDetailComponent } from './pizza-detail.component';

import { PizzaService } from './service/pizza.service';

import { AppRoutingModule } from './module/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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

<a href="../angular2">Retour au sommaire Angular 2</a>.