---
title: Angular 2 - Observable
---

# L'Observable dans Angular 2

L'Observable peut être perçu comme l'amélioration d'une promesse en JavaScript. Il est très utilisé avec Angular 2. Pour mieux comprendre l'Observable, prenons un exemple dans un composant simple.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Observable avec Angular 2</h1>
  `
})
export class AppComponent {

}
```

On va commencer par importer la classe Observable et Observer à partir de rxjs/Observable et rxjs/Observer. Ensuite, on crée une variable api qui sera de type Observable.

```js
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'my-app',
  template: `
    <h1>Observable avec Angular 2</h1>
    <div *ngFor="let data of datas">
      {{ data }}
    </div>
  `
})
export class AppComponent {
  private api: Observable<Number>;
  private datas: Array<Number> = [];

  constructor() {
    this.api = new Observable((observer: Observer<Number>) => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);
      setTimeout(() => {
        observer.next(2);
      }, 2000);
      setTimeout(() => {
        observer.next(3);
      }, 3000);
      setTimeout(() => {
        observer.next(4);
      }, 4000);
    });

    var subscription = this.api.subscribe((value: Number) => this.datas.push(value));
  }
}
```

Ici, on voit bien la variable api qui est un observable censé renvoyer des entiers. On initialise ensuite une variable datas qui est un tableau vide et qui sera censé contenir des entiers. Dans le constructeur, on initialise api qui est une instance d'un observable et qui prend en paramètre un callback avec comme paramètre un observer. L'observer va pouvoir renvoyer plusieurs données à la suite, on pourra par la suite souscrire à l'api afin de récupérer ces données une à une si on le souhaite.

<a href="../angular2">Retour au sommaire Angular 2</a>.
