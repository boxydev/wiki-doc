---
title: Ionic - Créons la page à propos
---

# Créer la page à propos de notre application

Comme pour la CLI d'Angular, il est possible de générer rapidement une page.

```bash
ionic generate page About --no-module
```

Maintenant, comment accèder à notre nouvelle page ? Il faut utiliser le service ```NavController``` d'Ionic.

Commençons d'abord par déclarer notre composant dans le module (Comme on le ferait sous Angular).

```js
// ...
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage
  ],
  //...
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage
  ],
  // ...
})
export class AppModule {}
```

On peut ajouter un bouton sur notre page d'accueil.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Meteo Application
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>Bienvenue sur mon application mobile Meteo Application :)</p>
  <button ion-button (click)="navToAbout()">A propos</button>
</ion-content>
```

Vous avez remarqué qu'on a ajouté un appel à une fonction ```navToAbout()```. Créons cette fonction dans le composant ```home.ts```.

```js
// ...
import { AboutPage } from '../about/about';
// ...
export class HomePage {
    // ...
    navToAbout () {
        this.navCtrl.push(AboutPage);
    }
}
```

On va ensuite [créer un menu déroulant](creer-un-menu-deroulant.html).
