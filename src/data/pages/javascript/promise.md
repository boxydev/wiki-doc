---
title: Promise
---

# L'objet Promise en JavaScript

Depuis ES6, il est possible de créer des promesses en JavaScript (Promise). La promesse va nous permettre d'éviter de faire un tas de callbacks imbriqués et réaliser des traitements asynchrones de manière simultanée.

Exemple concret : On veut récupérer des utilisateurs sur notre API. On créer une fonction ajax qui permet de les récupérer mais comment retourner quelque chose quand la requête est terminée ?

```js
var get = function (url) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText)
        }
    }
    xhr.send()
}

get('https://jsonplaceholder.typicode.com/users')
```

Une solution simple serait l'utilisation d'un callback.

```js
var get = function (url, success) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            success(xhr.responseText)
        }
    }
    xhr.send()
}

get('https://jsonplaceholder.typicode.com/users', function (data) {
    console.log(data)
})
```

Le problème est que si je veux enchainer les requêtes ajax, je me retrouve vite avec cela. C'est vite illisible et difficilement maintenable.

```js
get('https://jsonplaceholder.typicode.com/users', function (data) {
    data = JSON.parse(data)
    get('https://jsonplaceholder.typicode.com/posts?userId=' + data[0].id, function (data) {
        console.log(data)
    })
})
```

Avec la promesse, on va traiter le problème d'une manière différente.

```js
var get = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                resolve(xhr.responseText)
            }
        }
        xhr.send()
    })
}

// La fonction get retourne maintenant une promesse.
get('https://jsonplaceholder.typicode.com/users').then(function (data) {
    console.log(data)
})
```

On peut maintenant enchainer les appels Ajax sans problème.

```js
get('https://jsonplaceholder.typicode.com/users').then(function (data) {
    data = JSON.parse(data)
    return get('https://jsonplaceholder.typicode.com/posts?userId=' + data[0].id)
}).then(function (data) {
    console.log(data)
})
```