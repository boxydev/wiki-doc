---
title: Angular 2 - Gérer une liste d'auteur
---

# Gérer une liste d'auteur

On peut créer une constante qui sera un tableau contenant nos auteurs. On remarque le typage bien présent grâce à TypeScript, on attend bien un **tableau d'auteur**. Angular 2 est très "java-esque" sur les bords. On peut écrire ce code juste après la déclaration de la classe Author.

```js
const AUTHORS : Author[] = [
  { id: 1, name: 'Matthieu', age: 25 },
  { id: 2, name: 'Marina', age: 26 },
  { id: 3, name: 'Maxime', age: 21 },
  { id: 4, name: 'Thomas', age: 17 }
];
```

On crée une propriété author dans notre classe AppComponent qui stocke le tableau d'auteurs. On peut ensuite parcourir le tableau afin d'afficher chaque auteur dans un li grâce à la directive ```*ngFor``` d'Angular 2.

```js
@Component({
  // ...
  template: `
    ...
    <h2>Les auteurs</h2>
    <ul class="authors">
      <li *ngFor="let author of authors">
        <span>{{author.id}}: {{author.name}}</span>
      </li>
    </ul>
  `,
})
export class AppComponent {
  // ...
  authors = AUTHORS;
  // ...
}
```

On peut ajouter un peu de CSS grâce à la propriété styles du décorateur Component.

```js
styles: [`
    .authors li:hover {
        cursor: pointer;
    }
`]
```

Et maintenant un petit écouteur d'événement au click sur un auteur. Un petit ```console.log``` pour vérifier la valeur.

```js
<li *ngFor="let author of authors" (click)="onSelect(author)">

export class AppComponent {
    // ...
    onSelect(author: Author): void {
        console.log(author);
    }
}
```

On refactorise quelque peu notre code afin d'avoir une première chose qui fonctionne bien.

```js
@Component({
  // ...
  template: `
    ...
    <div *ngIf="selectedAuthor">
      <h2>{{selectedAuthor.name}}</h2>
      <div><label>id: </label>{{selectedAuthor.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedAuthor.name" placeholder="name">
      </div>
      <div><label>age: </label>{{selectedAuthor.age}}</div>
    </div>
    ...
  `,
  // ...
})
export class AppComponent {
  // ...
  selectedAuthor: Author;

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }
  // ...
}
```

Essayons maintenant de cliquer sur un auteur.

<a href="../angular2">Retour au sommaire Angular 2</a>.