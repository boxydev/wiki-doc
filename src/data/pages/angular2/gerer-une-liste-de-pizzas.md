---
title: Angular 2 - Gérer une liste de pizzas
---

# Gérer une liste de pizzas

On peut créer une constante qui sera un tableau contenant nos pizzas. On remarque le typage bien présent grâce à TypeScript, on attend bien un **tableau de pizzas**. Angular 2 est très "java-esque" sur les bords. On peut écrire ce code juste après la déclaration de la classe Pizza.

```js
const PIZZAS : Pizza[] = [
  { id: 1, name: 'Reine', age: 12 },
  { id: 2, name: '4 fromages', age: 13 },
  { id: 3, name: 'Orientale', age: 11 },
  { id: 4, name: 'Cannibale', age: 9 }
];
```

On crée une propriété pizza dans notre classe AppComponent qui stocke le tableau de pizzas. On peut ensuite parcourir le tableau afin d'afficher chaque pizza dans un li grâce à la directive ```*ngFor``` d'Angular 2.

```js
@Component({
  // ...
  template: `
    ...
    <h2>Les pizzas</h2>
    <ul class="pizzas">
      <li *ngFor="let pizza of pizzas">
        <span>{{pizza.id}}: {{pizza.name}}</span>
      </li>
    </ul>
  `,
})
export class AppComponent {
  // ...
  pizzas = PIZZAS;
  // ...
}
```

## Un peu de CSS

On peut ajouter un peu de CSS grâce à la propriété styles du décorateur Component.

```js
styles: [`
  .pizzas li:hover {
    cursor: pointer;
  }
`]
```

## Un peu d'événement

Et maintenant un petit écouteur d'événement au click sur une pizza. Un petit ```console.log``` pour vérifier la valeur.

```js
<li *ngFor="let pizza of pizzas" (click)="onSelect(pizza)">

export class AppComponent {
  // ...
  onSelect(pizza: Pizza): void {
    console.log(pizza);
  }
}
```

On refactorise quelque peu notre code afin d'avoir une première chose qui fonctionne bien.

```js
@Component({
  // ...
  template: `
    ...
    <div *ngIf="selectedPizza">
      <h2>{{selectedPizza.name}}</h2>
      <div><label>id: </label>{{selectedPizza.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedPizza.name" placeholder="name">
      </div>
      <div><label>age: </label>{{selectedPizza.age}}</div>
    </div>
    ...
  `,
  // ...
})
export class AppComponent {
  // ...
  selectedPizza: Pizza;

  onSelect(pizza: Pizza): void {
    this.selectedPizza = pizza;
  }
  // ...
}
```

Essayons maintenant de cliquer sur une pizza.

<a href="../angular2">Retour au sommaire Angular 2</a>.