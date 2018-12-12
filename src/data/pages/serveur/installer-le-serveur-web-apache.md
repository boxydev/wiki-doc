---
title: Serveur - Installer le serveur web Apache
---

# Installation du serveur web Apache

Nous souhaitons accèder à notre serveur via un navigateur web, par exemple <a href="http://192.168.1.x" target="_blank">http://192.168.1.x</a>

Evidemment, cela ne fonctionne pas pour le moment, car nous n'avons pas de service web installé.  
Comment installer un serveur web sous Linux ? Et surtout, comment installer quelque chose sous Linux ?  
Sous Ubuntu, et la plupart des distributions de la famille Debian, la gestion des logiciels est géré via un outil <a href="https://doc.ubuntu-fr.org/apt" target="_blank">APT</a>.  
Tout, absolument tout, est géré via ce gestionnaire, même le système d'exploitation lui même.

Voici quelques commandes utiles :

- ```sudo apt update``` met à jour la liste des paquets (Pas sur le système mais sur le côté).
- ```sudo apt upgrade``` met à jour les paquets sur le système.
- ```apt search PAQUET``` cherche un paquet dans la base de données.

Si on veut voir une liste de paquets, c'est <a href="https://packages.ubuntu.com/" target="_blank">par ici</a>.  
Attention, il faut se procurer les droits administrateurs pour installer un paquet via la commande ```sudo```.

## Installation

Pour installer Apache :

```bash
sudo apt install apache2
```

On confirme l'installation et on peut se rendre sur <a href="http://192.168.1.x" target="_blank">http://192.168.1.x</a> pour voir la page d'accueil par défaut d'Apache, amazing !

## Configuration

La configuration d'Apache se situe dans ```/etc/apache2```.  
On peut activer / désactiver des modules mais aussi créer des Hôtes virtuels, ce qui permet d'avoir plusieurs sites comme supersite1.box, supersite2.box et supersite3.box.

Nous allons créer ```supersite.box```, pour se faire, on va se rendre dans le dossier ```/etc/apache2/sites-available```, allez, vous connaissez la commande !

```bash
cd /etc/apache2/sites-available
sudo nano supersite.conf
```

Nano ? Qu'est-ce que c'est ? C'est un éditeur de texte en console.

On va copier/coller tout ça :

```
# /etc/apache2/sites-available/supersite.conf
<VirtualHost *:80>
    # Les domaines écoutés par ce virtual host
    ServerName supersite.box
    ServerAlias *.supersite.box

    # L'emplacement des fichiers PHP / HTML
    DocumentRoot /var/www/supersite.box

    # On autorise le fichier .htaccess avec AllowOverride
    # On empêche le listing des fichiers et on suit les liens symboliques (raccourcis sous Linux)
    <Directory /var/www/supersite.box>
        Options -Indexes +FollowSymLinks
        AllowOverride All
    </Directory>

    # Logs s'il y a un problème ou si on veut suivre le traffic du site
    ErrorLog /home/username/logs/error.log
    CustomLog /home/username/logs/access.log combined
</VirtualHost>
```

On créer le dossier supersite.box via un symlink sur notre répertoire utilisateur :

```
mkdir /home/username/logs
mkdir /home/username/supersite.box
ln -s /home/username/supersite.box /var/www/supersite.box
```

On active le Vhost :

```bash
sudo a2ensite supersite.conf
systemctl reload apache2
```

## Exercice

On va créer un fichier index.html dans le repertoire ```/home/username/supersite.box``` via ```nano``` et on se rend sur <a href="http://supersite.box" target="_blank">http://supersite.box</a>  
Quoi ? Cela ne fonctionne pas ? Oui, il va falloir <a href="https://www.wistee.fr/configuration-nom-domaine/modifier-fichier-hosts.html" target="_blank">modifier le fichier host de notre machine</a>.

Vous l'avez compris, pour le moment, on ne peut faire que de l'HTML. Mais on souhaite [installer PHP](installer-php-et-php-fpm.html) pour faire du Wordpress, du Symfony et plein d'autres choses incroyables.
