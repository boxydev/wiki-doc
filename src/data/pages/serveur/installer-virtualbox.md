---
title: Serveur - Installation de Virtualbox
---

# Installation de Virtualbox

La première étape est <a href="https://www.virtualbox.org/" target="_blank">l'installation de Virtualbox</a> afin de pouvoir virtualiser le serveur sur notre machine. On va également devoir récupérer notre distribution **Linux** favorite. Il en existe plusieurs :

Pour démarrer :

- <a href="https://ubuntu-fr.org/" target="_blank">Ubuntu</a>
- <a href="https://www.debian.org/index.fr.html" target="_blank">Debian</a>
- <a href="https://getfedora.org/fr/" target="_blank">Fedora</a>
- <a href="https://fr.centos.org/" target="_blank">CentOS</a>

Pour l'aventure :

- <a href="https://www.archlinux.org/" target="_blank">ArchLinux</a>
- <a href="https://www.gentoo.org/" target="_blank">Gentoo</a>

Nous ne prendrons aucune de ces distributions pour créer notre serveur. En effet, ces distributions sont faites pour un usage **bureau**, et nous avons besoin d'un usage **serveur** de notre côté (pas d'interface graphique ou de *bling-bling*).
Nous allons donc prendre la version serveur d'**Ubuntu**, <a href="https://ubuntu-fr.org/telechargement?variante=server" target="_blank">ici</a>.

On peut ensuite créer une nouvelle machine virtuelle que l'on va nommer "Serveur". On peut lui associer 2Go de RAM. 20Go de disque dur suffira.

![Virtualbox](../img/serveur/virtualbox.png)

On modifie les paramètres de la carte réseau en **"Accès par pont"**. Cela permettra à la machine d'être considéré comme une "vraie" machine sur le réseau (192.168.x.x).

![Virtualbox](../img/serveur/virtualbox-2.png)

On peut démarrer la machine en insérant l'ISO d'Ubuntu server dans le lecteur virtuel.

La machine est créée, on peut maintenant [installer Ubuntu server](installer-ubuntu-server.html).
