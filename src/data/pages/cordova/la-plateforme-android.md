---
title: Cordova - La plateforme Android
---

# Utiliser Android avec Cordova

C'est ici que les choses se compliquent. Comment tester notre application sur Android ? La première chose à savoir est que, pour chaque plateforme sur laquelle vous voulez compiler votre application, il vous faut le SDK concerné.

Par exemple, pour <a href="https://cordova.apache.org/docs/en/7.x/guide/platforms/ios/index.html" target="_blank">compiler sous macOS</a>, il faut le SDK iOS, présent avec <a href="https://itunes.apple.com/us/app/xcode/id497799835?mt=12" target="_blank">XCode</a>.

Pour <a href="https://cordova.apache.org/docs/en/7.x/guide/platforms/android/index.html" target="_blank">compiler sous Android</a>, c'est plus complexe. Il nous faut <a href="https://developer.android.com/studio/index.html" target="_blank">Android Studio</a>, le SDK de la version Android concerné et aussi le <a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" target="_blank">Java JDK</a>.

Il faudra ensuite s'occuper des variables d'environnement. Il faut créer ```JAVA_HOME``` et ```ANDROID_HOME```. Il faudrait également ajouter les dossiers ```tools/``` et ```platform-tools``` du SDK Android au ```PATH```.

Sous **Linux** :  
On va modifier la variable PATH via le .bash_profile ou .zshrc

```bash
export ANDROID_HOME=${HOME}/Android/Sdk
export PATH=${PATH}:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools
```

Dans les dernières versions, Cordova utilise Grable pour le build des applications, il faut donc l'ajouter dans le PATH également :

```bash
# VERSION est à remplacer par 4.1 ou supérieur
export PATH=${PATH}:/opt/android-studio/gradle/gradle-VERSION/bin
```

Maintenant, on peut retourner sur notre projet et ajouter la plateforme Android :

```bash
cordova platform add android
```

On vérifie que tout est bien détecté par Cordova :

```bash
cordova requirements android
```

On peut donc ouvrir le dossier ```platforms/android``` dans Android Studio et on clique sur "Ok" pour Gradle.
Maintenant, on doit pouvoir lancer l'application sur un émulateur et même sur un vrai téléphone Android.

Cordova est donc parfaitement configuré sur notre machine. Nous allons pouvoir travailler sur notre nouvelle application. Nous aimerions utiliser Angular directement. Nous pourrions le faire fonctionner dans Cordova, mais cela demanderait beaucoup de travail inutile déjà effectué par [Ionic](https://ionicframework.com/)...

En effet, ce framework va nous simplifier la vie de développeur. On aura un rechargement en temps réel de l'application, un émulateur plus poussé (iPhone et Android) directement dans le navigateur.  
Il va nous fournir de nombreux composants nous permettant de construire une application mobile (Menu "glissant" sur le côté, Menu positionné en bas, effet de défilement style mobile, etc...) ainsi que des modules Angular nous permettant de contrôler directement le téléphone.

Voyons [comment installer Ionic](../ionic).
