---
title: Serveur - Installer Postfix
---

# Installation de Postfix

Nos applications et sites web devront être capables d'envoyer des emails. Nous allons donc installer postfix pour cela :

```
sudo apt install postfix
```

On peut également installer les utilitaires permettant d'envoyer des mails en local :

```
sudo apt install mailutils
```

Pour envoyer un mail de test :

```
echo "Message" | mail -s "Hello" -a "From: sender@domain.com" recipient@domain.com
```
