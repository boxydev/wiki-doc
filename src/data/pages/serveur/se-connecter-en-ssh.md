---
title: Serveur - Connexion en SSH
---

# Connexion en SSH

On va imaginer que notre serveur se situe quelque part dans le monde. Nous devons nous y connecter à distance. Nous n'allons pas nous déplacer chaque jour jusqu'au Datacenter pour accèder au clavier et à l'écran.  
D'ailleurs, il n'y a pas d'écran sur notre serveur, ni d'interface graphique. Nous avons le minimum vital nécessaire pour faire fonctionner un serveur web.

Nous pouvons utiliser **PowerShell** pour cela, mais il existe un émulateur Unix : <a href="http://cmder.net/" target="_blank">Cmder</a>.

<a href="https://fr.wikipedia.org/wiki/Unix" target="_blank">Unix</a> ? C'est une famille d'OS dont Linux fait partie, ainsi que macOS, mais pas Windows malheureusement.  
Cmder nous propose ainsi pour Windows toutes les commandes de base que l'on peut saisir sur un serveur Linux dont la fameuse commande ```ssh```.

On va se connecter à notre serveur et on saisit le mot de passe (Attention, la saisie n'apparait pas à l'écran pour des raisons de sécurité) :

```bash
ssh username@192.168.1.x
```

Nous sommes connectés.

![SSH](../img/serveur/ssh-success.png)

Avant de commencer à paniquer sans savoir quoi faire dans cette boîte noire, voyons les [commandes UNIX de base](commandes-unix.html).
