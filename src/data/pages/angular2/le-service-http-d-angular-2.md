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

import { PizzaService } from './service/pizza.service';

import { AppRoutingModule } from './module/app-routing.module';

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
import { BoxydevFakeApi }  from './service/boxydevfakeapi.service';

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
import { Pizza } from '../model/pizza';

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

import { Pizza } from '../model/pizza';
import { PIZZAS } from '../mock/mock-pizza';

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

<a href="../angular2">Retour au sommaire Angular 2</a>.