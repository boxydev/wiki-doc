---
title: Serveur - Installer PHP et PHP FPM
---

# Installation de PHP et de PHP FPM

Nous allons maintenant installer PHP et surtout coupler PHP à Apache.  
La plupart des tutoriels sur internet vous diront qu'il faut installer un module PHP pour Apache. C'est la méthode la plus simple en effet, mais pas la plus performante. Nous allons plutôt installer <a href="http://php.net/manual/fr/install.fpm.php" target="_blank">PHP FPM</a>.

On installe PHP FPM :

```bash
sudo apt install php-fpm
```

Pour vérifier l'installation de PHP :

```bash
php -v
```

On doit ensuite lier Apache et PHP FPM :

```bash
sudo a2enmod proxy_fcgi
sudo a2enconf php7.2-fpm
```

Le meilleur moyen de tester cette installation est de créer un fichier ```index.php``` contenant la fonction ```phpinfo()```.

On va pouvoir maintenant [installer MySQL](installer-mysql.html) pour gérer nos bases de données.
