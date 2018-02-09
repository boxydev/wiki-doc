---
title: Ionic - Créer un menu en tabs
---

# Créer un menu en tabs

L'idée est de pouvoir naviguer rapidement entre la configuration de l'application météo et la page d'accueil.

Commencons par créer une page Settings.

```bash
ionic generate page Settings --no-module
```

Le contenu de la page sera quasiment identique à la page d'accueil, notamment pour le header.

```html
<ion-header>
  <ion-navbar color="primary">
    <button ion-button menuToggle icon-only>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>
      Réglages
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <form (ngSubmit)="save()">
    <ion-item>
      <ion-label>Ville</ion-label>
      <ion-input type="text"></ion-input>
    </ion-item>
    <button ion-button block>Enregistrer</button>
  </form>
</ion-content>
```

Ensuite, on va créer une page spécifique qui deviendra la page principale de l'application, ```TabsPage```.

Voici le contenu html :

```html
<ion-tabs>
  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>
  <ion-tab [root]="tab2Root" tabTitle="Settings" tabIcon="cog"></ion-tab>
</ion-tabs>
```

Et le contenu ts :

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
```

Il ne faut pas oublier de déclarer tous les composants dans le module et surtout changer la variable ```rootPage``` du composant App.

Maintenant, on va essayer de récupérer les informations du formulaire et les enregistrer quelque part.

[Retour au sommaire Ionic](../ionic).
