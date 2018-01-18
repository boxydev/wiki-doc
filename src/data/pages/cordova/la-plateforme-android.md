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
