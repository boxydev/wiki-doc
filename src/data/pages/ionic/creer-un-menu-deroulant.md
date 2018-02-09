---
title: Ionic - Créer un menu déroulant
---

# Créer un menu déroulant

Pour créer un menu déroulant, on peut utiliser le composant ```ion-menu```.

Modifions le fichier app.html :

```html
<ion-menu [content]="content">
    <ion-header>
        <ion-toolbar>
            <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-list>
            <button ion-item (click)="openPage()">A propos</button>
        </ion-list>
    </ion-content>
</ion-menu>

<ion-nav #content [root]="rootPage"></ion-nav>
```

Et le nouveau app.component.ts :

```js
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menu: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage () {
    this.menu.close();
    this.nav.push(AboutPage);
  }
}
```

On peut maintenant nettoyer les fichiers ```home.html``` et ```home.ts```

```html
<ion-header>
  <ion-navbar color="primary">
    <button ion-button menuToggle icon-only>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>
      Meteo Application
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>Bienvenue sur mon application mobile Meteo Application :)</p>
</ion-content>
```

Maintenant, nous allons faire un [second menu](creer-un-menu-en-tabs.html) afin de naviguer entre la home page et la page de réglages pour la météo.
