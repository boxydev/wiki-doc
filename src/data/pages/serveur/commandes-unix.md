---
title: Serveur - Commandes UNIX
---

# Commandes UNIX de base

Pour intéragir avec un serveur, ce n'est pas comme sur un bureau Windows. Nous n'avons rien de visuel et il faut saisir des lignes de commandes.

La racine sous Linux est ```/``` et pas une lettre.  
Le ~ équivaut au répertoire utilisateur soit ```/home/username```.  
Pour saisir une commande : ```ls```.  
Pour saisir une commande avec argument : ```ls dossier```.  
Pour saisir une commande avec options : ```ls -al```.

Voici une liste de commandes de base :

- ```pwd``` permet de savoir dans quel dossier on est situé
- ```cd <path>``` permet de se déplacer dans un dossier/fichier
- ```ls``` liste les fichiers du dossier dans lequel on est situé
    - ```-a``` affiche les fichiers cachés
    - ```-l``` affiche une liste détaillé
- ```mkdir <path>``` permet de créer un dossier
- ```rmdir <path>``` permet de supprimer un dossier
- ```touch <pathfile>``` permet de créer un fichier
- ```rm <pathfile>``` permet de supprimer un fichier
    - ```-r``` suppression récursive d'un dossier et son contenu
- ```chmod <mode(644, +r, u+w...)> <pathfile>``` permet de modifier les permissions d'un dossier ou fichier
- ```chown <user:group> <pathfile>``` permet de changer le propriétaire d'un dossier ou fichier
- ```clear``` nettoie le terminal
- ```sudo <commande>``` exécute une commande en mode root (administrateur)
- ```apt-get update``` met à jour la liste des paquets
- ```apt-get install <name>``` permet d'installer un nouveau paquet (application ou service)

Pour en savoir plus sur <a href="https://doc.ubuntu-fr.org/permissions" target="_blank">les permissions sous Linux</a>.

## Exercices

Pour maitriser ces commandes, rien de tel que la pratique. N'hésitez pas à vous renseigner sur ```man``` afin de connaitre un peu mieux chaque commande Linux. Vous pouvez aussi vous aider de <a href="https://doc.ubuntu-fr.org/tutoriel/console_ligne_de_commande" target="_blank">la documentation officielle</a>.

1. Dans quel dossier êtes-vous situés à l'arrivée sur le serveur ?
2. Créer un dossier ```projet1``` dans votre répertoire utilisateur.
3. Créer un fichier ```index.html``` et un fichier ```style.css``` dans ce répertoire.
4. Faites la même chose avec ```projet2```.
5. En une seule commande, supprimer le dossier ```projet2``` et son contenu.
6. Lister tous les dossiers / fichiers présents à la racine du système.

Nous allons maintenant nous intéresser à [l'installation de notre serveur web Apache](installer-le-serveur-web-apache.html).
