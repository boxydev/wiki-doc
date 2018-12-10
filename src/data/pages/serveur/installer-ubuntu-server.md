---
title: Serveur - Installation d'Ubuntu Server
---

# Installation d'Ubuntu Server

![Ubuntu Server](../img/serveur/ubuntu-server.png)

Après avoir choisi la langue de l'installateur (français évidemment), on configure notre clavier grâce aux flèches haut et bas du clavier ainsi que de la touche Entrée.

A l'étape 3, nous choisissons simplement **"Installer Ubuntu"**.  
A l'étape 4 (Configuration du réseau), tout doit être automatique grâce au DHCP.  
A l'étape 5, nous n'avons pas de proxy.  
A l'étape 6, le mirroir par défaut est suffisant.  
A l'étape 7, on choisit **"Disque entier"**, on confirme l'action.  

Pour l'étape 8, on configure notre utilisateur comme le screenshot ci-dessus. Attention, le username doit être en **minuscule, sans espaces et sans caractères spéciaux !**

![Etape 7](../img/serveur/etape-7.png)

A l'étape 9, on n'installe aucun paquet, car on le fera plus tard.

On redémarre la machine et on retire l'ISO quand on nous le demande : **Périphériques > Lecteurs optiques > Ejecter le disque du lecteur virtuel**.

On arrive à l'étape du premier démarrage.

![Boot](../img/serveur/boot.png)

On va pouvoir [se connecter sur le serveur en SSH](se-connecter-en-ssh.html).
