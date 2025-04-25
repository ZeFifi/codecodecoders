---
title: "Comprendre filter en JavaScript"
pubDate: "2025-04-25"
description: "Découvrons ensemble comment filtrer efficacement des tableaux en JavaScript grâce à la méthode filter."
author:
  name: "Philippe Pinceloup"
  url: "https://www.linkedin.com/in/philippe-pinceloup/"
categories: ["frontend"]
---

## Pourquoi utiliser filter ?

`.filter()` est une méthode incontournable lorsque vous travaillez avec des _arrays_ en JavaScript. Elle permet de sélectionner certains éléments d’un tableau en fonction d’un critère et de créer un nouveau tableau qui ne contient que les éléments qui respectent ce critère.

Là où `.map()` transforme tous les éléments (voir article [ici](map)), `.filter()` ne conserve que ceux qui passent un test.

## Syntaxe de base

```js
array.filter(callback);
```

Le _callback_ est une fonction qui doit retourner un booléen (`true` ou `false`) pour chaque élément :

```js
(valeurCourante, index, tableau) => condition;
```

- **valeurCourante** : l’élément actuel du tableau.
- **index (optionnel)** : sa position dans le tableau.
- **tableau (optionnel)** : le tableau d’origine.

`.filter()` retourne un nouveau tableau, qui ne contient que les éléments pour lesquels le callback retourne `true`.

## Comment fonctionne filter étape par étape

Prenons un exemple simple :

```js
const nombres = [1, 2, 3, 4];
const pairs = nombres.filter((nombre) => nombre % 2 === 0);
```

Ici, on souhaite ne garder que les nombres pairs. On utilise donc l'opérateur modulo `%` qui calcule le reste d'une division entre deux nombres. Si le reste est 0, cela signifie que le nombre est divisible par 2, donc qu'il est pair.

En français, on pourrait donc lire ce code de la manière suivante : à partir de l'_array_ `nombres`, filtre tous les nombres et conserve uniquement ceux qui pairs.

### Étapes de filtrage

| Étape | valeurCourante | condition | Inclus ? | Résultat |
| ----- | -------------- | --------- | -------- | -------- |
| 1     | 1              | false     | ✖️       | []       |
| 2     | 2              | true      | ✔️       | [2]      |
| 3     | 3              | false     | ✖️       | [2]      |
| 4     | 4              | true      | ✔️       | [2, 4]   |

## Cas d’usage concrets

### Cas d’usage 1 : Filtrer des nombres

```js
const nombres = [5, 12, 8, 130, 44];
const grands = nombres.filter((nombre) => nombre > 10);
```

**Résultat :** `[12, 130, 44]`

Ici, seuls les nombres supérieurs à 10 sont conservés.

### Cas d’usage 2 : Garder certains objets

```js
const utilisateurs = [
  { prenom: "Alice", actif: true },
  { prenom: "Bob", actif: false },
];

const actifs = utilisateurs.filter((utilisateur) => utilisateur.actif);
```

**Résultat :** `[ { nom: "Alice", actif: true } ]`

On ne garde ici que les utilisateurs actifs.

### Cas d’usage 3 : Supprimer des valeurs falsy

```js
const valeurs = [0, 1, false, 2, "", 3];
const filtrees = valeurs.filter(Boolean);
```

**Résultat :** `[1, 2, 3]`

Cette astuce est bien connue : utiliser simplement `Boolean` comme callback supprime les éléments `falsy` : `0`, `false`, `""`, `null`, `undefined`, `NaN`.

## Maintenant, à votre tour !

Voici quelques exercices simples pour vous entraîner avec `.filter()` :

### Exercice 1 : Ne garder que les nombres positifs

```js
const nombres = [-2, 3, 0, -1, 5];
// Résultat attendu : [3, 5]
```

<details>
<summary>Solution</summary>

```js
const positifs = nombres.filter((nombre) => nombre > 0);
```

On choisit de retourner ici chaque nombre supérieur à 0.

</details>

### Exercice 2 : Ne garder que les chaînes non vides

```js
const mots = ["bonjour", "", "salut", ""];
// Résultat attendu : ["bonjour", "salut"]
```

<details>
<summary>Solution</summary>

```js
const nonVides = mots.filter((mot) => mot !== "");
```

On ne retourne que les mots qui sont différents d'une _string_ vide.

</details>

### Exercice 3 : Filtrer des objets selon une propriété

```js
const personnes = [
  { nom: "Luc", age: 17 },
  { nom: "Emma", age: 22 },
];
// Résultat attendu : [{ nom: "Emma", age: 22 }]
```

<details>
<summary>Solution</summary>

```js
const majeurs = personnes.filter((personne) => personne.age >= 18);
```

Il y a plusieurs manières de faire pour cet exercice. J'ai choisi de n'afficher que les personnes majeures, donc toutes celles dont l'âge est supérieur ou égal à 18.

</details>

### Exercice 4 : Ne garder que les fichiers .js

```js
const fichiers = ["index.html", "app.js", "style.css", "script.js"];
// Résultat attendu : ["app.js", "script.js"]
```

<details>
<summary>Solution</summary>

```js
const fichierJS = fichiers.filter((fichier) => fichier.endsWith(".js"));
```

Pour chaque fichier, on ne conserve que ceux qui se terminent par `.js`.

</details>

## Bonnes pratiques

- Le callback de `.filter()` doit retourner `true` ou `false`. Seuls les éléments pour lesquels la condition est vraie seront inclus.
- `.filter()` ne modifie pas le tableau original. Il retourne toujours un nouveau tableau.

## En résumé

`.filter()` est la méthode idéale quand vous avez besoin de faire le tri dans un tableau. Elle vous permet de garder uniquement ce qui vous intéresse, tout en laissant le tableau original intact.

Une fois que vous maîtrisez `.filter()`, vous pourrez l’utiliser au quotidien pour rendre votre code plus clair, plus concis et plus expressif. Essayez de combiner `.map()` et `.filter()` pour aller encore plus loin dans la manipulation de données !
