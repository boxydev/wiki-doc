---
title: Serveur - Installer MySQL
---

# Installation de MySQL

Nous allons maintenant installer MySQL afin de pouvoir persister les données de notre site.

Pour installer MySQL :

```bash
sudo apt install mysql-server
```

Pour se connecter au serveur MySQL (attention, il faut être root) :

```bash
sudo mysql -u root
```

Par sécurité, on va créer un utilisateur pour chaque base de données :

```bash
sudo mysql -u root
mysql> CREATE DATABASE supersite;
mysql> CREATE USER 'username'@'localhost' IDENTIFIED BY 'motdepasse';
mysql> GRANT ALL PRIVILEGES ON supersite.* TO 'username'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> exit
```

Parfait, l'utilisateur aura accès à sa base de données seulement.

## Rappel

Pour exporter une base de données :

```bash
mysqldump -uusername -p supersite > dump.sql
```

Pour importer une base de données :

```bash
mysql -uusername -p supersite < dump.sql
```
