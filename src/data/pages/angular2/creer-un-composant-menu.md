---
title: Angular 2 - Créer un composant menu
---

# Créer un composant menu

Essayez de créer un composant menu MenuComposent pour notre application de Pizza. Vous pouvez le créer à la main ou alors utiliser Angular CLI.

```bash
ng generate component menu
```

Vous pouvez reprendre la navbar par défaut sur le site de Bootstrap. N'hésitez pas à externaliser le template et le css.

Maintenant, il va falloir inclure ce composant en tant qu'enfant pour notre AppComponent. A vous de le faire.

Vous pouvez également essayer de rendre le menu responsive. En effet, avec Angular, on évite l'utilisation de jQuery et donc pas de plugin collapse du JS Bootstrap ! Il va falloir trouver un moyen d'ajouter la classe in sur la div avec la classe collapse quand il y a un click sur le bouton.

Il faut donc :

- ajouter un champ isCollapsed dans le composant, initialisé à false (le menu est fermé par défaut).

- ajouter un écouteur de clic sur le bouton qui appelle une méthode toggleCollapseNavbar de notre composant

- écrire cette méthode pour qu’elle mette à jour un champ du composant isCollapsed de vrai à faux, ou de faux à vrai.

- la classe in devrait être ajoutée dynamiquement sur la div avec la classe collapse grâce à [class.in] ou à la directive ngClass dans le template.

Essayez ensuite d'intégrer les routerLink directement dans notre menu en essayant de voir si vous pouvez gérer la page qui est active avec la classe active et le routerLinkActive.

<a href="../angular2">Retour au sommaire Angular 2</a>.
