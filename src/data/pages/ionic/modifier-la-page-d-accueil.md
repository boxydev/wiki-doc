---
title: Ionic - Modifier la page d'accueil
---

# Modifier la page d'accueil de notre application

Le dossier ```src/``` contient toutes les sources de notre application, peu importe la plateforme. Le dossier ```www/``` contient les sources compilées et ne doit donc pas être modifié.

Modifions le fichier ```src/pages/home/home.html```.

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Meteo Application
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>Bienvenue sur mon application mobile Meteo Application :)</p>
</ion-content>
```

Les composants préfixés en ion nous permettent de gagner du temps sur la conception d'une application. Pour en savoir plus, vous pouvez <a href="https://ionicframework.com/docs/api/components/content/Content/" target="_blank">lire cela sur la doc</a>.

On peut facilement changer la couleur du header grâce à des attributs et aux variables Sass présentes dans le fichier ```theme/variables.scss```

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
</ion-content>
```

Super ! Mais maintenant, on aimerait créer d'autres pages. Attention, nous sommes dans une application, il n'y aura donc pas d'url.

[Créons la page à propos](creons-la-page-a-propos.html)
