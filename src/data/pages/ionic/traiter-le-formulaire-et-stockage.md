---
title: Ionic - Traiter le formulaire et Stockage
---

# Traiter le formulaire et Stockage

Pour le formulaire, la partie affichage est déjà faite. Il va falloir ajouter la directive ```ngModel``` dans le template.

```html
<form (ngSubmit)="save()">
  <ion-item>
    <ion-label>Ville</ion-label>
    <ion-input [(ngModel)]="city" name="city" type="text"></ion-input>
  </ion-item>
  <button ion-button block>Enregistrer</button>
</form>
```

Pour la partie logique, cela se passe dans le TypeScript :

```js
// ...
export class SettingsPage {
  city = 'Hulluch';
  // ...
  save () {
    console.log(this.city);
  }
}
```

Et oui ! Simplement accèder à l'attribut ```city``` du composant nous donne la valeur saisie, puisque tout est "bindé" grâce au ngModel :)

Maintenant, comment faire pour le stockage ? Vu que nous sommes sur une application, il est possible de stocker en local les données sur le téléphone. Ionic nous fournit un module qui sait le faire et surtout, qui va savoir utiliser un fallback dans le cas où nous testons notre application dans un navigateur (il utilisera IndexedDB du navigateur par exemple).

Activons le module dans l'application sur app.module.ts

```js
// ...
import { IonicStorageModule } from '@ionic/storage';
// ...
imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  IonicStorageModule.forRoot()
],
// ...
```

Et bien sûr, notre fichier settings.ts :

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city = 'Hulluch';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {
    this.storage.get('city').then(city => this.city = city);
  }

  save () {
    this.storage.set('city', this.city);
  }
}
```