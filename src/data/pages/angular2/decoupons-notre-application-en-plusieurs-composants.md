---
title: Angular 2 - Découpons notre application en plusieurs composants
---

# Découpons notre application en plusieurs composants

Pour le moment, c'est notre classe AppComponent qui gère toute notre application. Par la suite, notre application va voir de nombreuses fonctionnalités et sera difficilement maintenable. Le concept du framework Angular 2 est d'en profiter pour découper notre application en plusieurs composants, qui seront chacuns responsable d'une tache spécifique.

D'accord, allons-y, on va découper notre application.

Commencons par créer un composant qui sera responsable d'afficher un auteur en particulier. Créons un fichier ```author-detail.component.ts``` dans notre dossier ```app/```. On appellera cette classe AuthorDetailComponent.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'author-detail',
})
export class AuthorDetailComponent {
}
```

D'ailleurs, on en profite pour refactoriser une partie du template de AppComponent dans notre nouveau composant et on peut créer aussi une propriété author.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'author-detail',
  template: `
    <div *ngIf="author">
      <h2>{{author.name}}</h2>
      <div><label>id: </label>{{author.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="author.name" placeholder="name">
      </div>
      <div><label>age: </label>{{author.age}}</div>
    </div>
  `
})
export class AuthorDetailComponent {
  author: Author;
}
```

Soyons consciencieux et rangeons notre classe Author dans un dossier ```app/model/author.ts```.

```js
export class Author {
  id: number;
  name: string;
  age: number;
}
```

N'oublions pas d'importer la classe Author dans nos 2 composants.

```js
import { Author } from './model/author';
```

Ok Matthieu, mais comment je fais pour lier mes 2 composants maintenant ?

En fait, AuthorDetailComponent va devenir un enfant de AppComponent. On va pouvoir ajouter ce bout de code dans le template du AppComponent.

```js
<author-detail [author]="selectedAuthor"></author-detail>
```

Vous remarquez l'attribut author entre crochet ? C'est ce qui va permettre d'injecter l'auteur dans le composant AuthorDetailComponent. Pour faire cela, on va devoir préciser que author est une propriété Input. On importe cette propriété à partir du noyau d'Angular et on ajoute le décorateur sur la propriété author de author-detail.

```js
import { Component, Input } from '@angular/core';
// ...
@Input() author: Author;
```

La dernière étape pour que cela fonctionne est de déclarer ce nouveau composant dans le module de notre application.

```js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { AuthorDetailComponent } from './author-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AuthorDetailComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Et voici le template final dans notre AppComponent.

```js
template: `
    <h1>{{title}}</h1>
    <author-detail [author]="selectedAuthor"></author-detail>
    <h2>Les auteurs</h2>
    <ul class="authors">
      <li *ngFor="let author of authors"
        [class.selected]="author === selectedAuthor"
        (click)="onSelect(author)">
        <span>{{author.id}}: {{author.name}}</span>
      </li>
    </ul>
  `,
```

<a href="../angular2">Retour au sommaire Angular 2</a>.