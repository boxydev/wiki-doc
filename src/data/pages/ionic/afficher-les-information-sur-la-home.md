---
title: Ionic - Afficher les informations sur la Home
---

# Affichage des informations sur la Home

La dernière étape va être de modifier la Home afin d'afficher la météo de la ville choisie. La première étape va consister à récupérer la ville stockée dans le storage.

Modifions donc notre fichier home.ts :

```js
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  city = 'Hulluch';

  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
    this.storage.get('city').then(city => {
      if (null !== city) {
        this.city = city;
      }
    });
  }

}
```

Et aussi home.html

```html
<ion-header>
  <ion-navbar color="primary">
    <button ion-button menuToggle icon-only>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>
      Meteo à {{ city }}
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-grid>
    <ion-row>
      <ion-col col-6 offset-3>
        <h2>{{ city }}</h2>
        <div><img src="https://openweathermap.org/img/w/04d.png" alt="{{ city }}"></div>
        <h3>Description</h3>
        <h4>10 &deg;C</h4>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-list>
          <ion-item>
            <strong>Pression: </strong> 1005
          </ion-item>
          <ion-item>
            <strong>Humidité: </strong> 52 %
          </ion-item>
          <ion-item>
            <strong>Lever du soleil: </strong> 08:03
          </ion-item>
          <ion-item>
            <strong>Coucher du soleil: </strong> 18:03
          </ion-item>
          <ion-item>
            <strong>Coordonnées: </strong> 50.49, 2.81
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
```

Pour le ts, on est donc tenté de faire la même chose que le composant settings avec l'écoute de l'observer du storage directement dans le constructeur. Le problème est que le constructeur est chargé une seule fois au moment du lancement de l'application, il vaut mieux utiliser la méthode ```ionViewWillEnter``` qui sera appelée à chaque fois qu'on retourne sur la page Home, même si on vient de la page Settings.

```js
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  city = 'Hulluch';

  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
  }

  ionViewWillEnter () {
    this.storage.get('city').then(city => {
      if (null !== city) {
        this.city = city;
      }
    });
  }

}
```

Voilà qui est mieux.

[Retour au sommaire Ionic](../ionic).
