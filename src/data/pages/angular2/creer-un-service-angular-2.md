---
title: Angular 2 - Créer un service Angular 2
---

# Créer un service avec Angular 2

Un service va nous permettre d'écrire toute la logique qui concerne la récupération et le traitement d'une certaine donnée. Dans notre cas, c'est le service PizzaService qui va s'occuper de nous donner le tableau de Pizza, ou alors récupérer les Pizzas sur une API par exemple.

## Service Pizza

Commencons par créer notre fichier pizza.service.ts.

```js
import { Injectable } from '@angular/core';

@Injectable()
export class PizzaService {
    getPizzas(): void {}
}
```

## Mock Pizza

Vous avez remarquer que cette classe n'est pas un composant pour Angular, mais un injectable. Cela signifie pour lui que cette classe pourra dépendre d'une autre classe, comme par exemple la classe HTTP que l'on verra bientôt afin de récupérer les données sur une API. La méthode getPizzas nous permettra de récupérer nos pizzas d'une API ou d'un fichier (d'ailleurs nous allons créer mock-pizzas.ts).

```js
import { Pizza } from './model/pizza';

export const PIZZAS : Pizza[] = [
  { id: 1, name: 'Reine', price: 12 },
  { id: 2, name: '4 fromages', price: 13 },
  { id: 3, name: 'Orientale', price: 11 },
  { id: 4, name: 'Cannibale', price: 9 }
];
```

Dans notre app.component.ts, on va modifier la propriété pizzas.

```js
pizzas: Pizza[];
```

## Service + Mock

Voici notre service au final.

```js
import { Injectable } from '@angular/core';

import { Pizza } from '../model/pizza';
import { PIZZAS } from '../mock/mock-pizza';

@Injectable()
export class PizzaService {
  getPizzas(): Pizza[] {
    return PIZZAS;
  }
}
```

On va maintenant devoir injecter ce nouveau service dans notre AppComponent. Pour faire cela, on commence par l'importer et on va l'injecter via le constructeur. En voulant faire cela, on doit avoir une erreur dans la console 'ERROR Error: No provider for PizzaService!'. Il va falloir ajouter PizzaService dans l'attribut providers de notre composant App.

```js
providers: [PizzaService]
```

## Cycle de vie

Maintenant, il va falloir qu'on remplisse la variable pizzas de AppComponent. La bonne question est quand est-ce que l'on doit faire cela ? Et bien, il va falloir le faire au moment où le composant est initialisé. On pourrait être tenté de le faire dans le constructeur. Mais la bonne pratique est d'utiliser le cycle de vie d'une application Angular. Pour cela, on va pouvoir utiliser une méthode, ngOnInit. Notre composant va devoir implémenter l'interface OnInit de cette manière (Ne récopiez pas ce code).

```js
import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
}
```

La méthode ngOnInit s'execute exactement quand le composant est initialisé, on va pouvoir ajouter notre tableau de pizzas à ce moment.

```js
ngOnInit(): void {
  this.pizzas = this.pizzaService.getPizzas();
}
```

## Promesse

Pour l'instant, notre service retourne un tableau de Pizzas défini en dur. Imaginons que ces pizzas proviennent d'un web service ou d'une API. Cette API sera sur un autre serveur et peut donc être amenée à être lente en fonction de plusieurs facteurs comme la connexion de l'utilisateur. Imaginez ces données en train de charger et bloquant l'affichage de l'application... Pour éviter cela, on va charger ces données de manière asynchrone (toute notre application va charger jusqu'au bout même si toutes les pizzas ne sont pas encore là). Pour cela, nous allons utiliser une promesse.

```js
getPizzas(): Promise<Pizza[]> {
  return Promise.resolve(PIZZAS);
}
```

Dans notre AppComponent, on récupére maintenant une promesse et plus un tableau directement.

```js
ngOnInit(): void {
  this.pizzaService.getPizzas().then(pizzas => this.pizzas = pizzas);
}
```

Attention, ici on utilise l'ES6 (ou ES2015) pour pouvoir utiliser le this.

Bon, pour le moment, c'est facile, la promesse renvoie une réponse en 0 ms, ce qui n'existe pas mis à part en local. On va créer une fonction en plus pour simuler une réponse plus lente d'un serveur.

```js
getPizzasSlowly(): Promise<Pizza[]> {
  return new Promise(resolve => {
    setTimeout(() => resolve(this.getPizzas()), 2000);
  });
}
```

<a href="../angular2">Retour au sommaire Angular 2</a>.