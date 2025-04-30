---
title: "Comprendre le chaining de map, filter et reduce"
pubDate: "2025-05-02"
description: "Apprenez à combiner map, filter et reduce pour écrire du code JavaScript plus clair et puissant."
author:
  name: "Philippe Pinceloup"
  url: "https://www.linkedin.com/in/philippe-pinceloup/"
categories: ["frontend"]
---

## Pourquoi chaîner map, filter et reduce ?

Lorsqu'on travaille avec des tableaux en JavaScript, il est très courant d'avoir besoin d'enchaîner plusieurs transformations :

- transformer les éléments (`map`)
- sélectionner certains éléments (`filter`)
- combiner le tout en une seule valeur (`reduce`)

Plutôt que de faire plusieurs étapes séparées, JavaScript nous permet de chaîner ces méthodes. Cela rend votre code :

- plus clair
- plus expressif
- plus facile à maintenir

Avant de poursuivre, assurez-vous d'avoir bien compris les méthodes [map](map), [filter](filter) et [reduce](reduce).

## Le concept du chaining

Chaque appel `.map()`, `.filter()`, ou `.reduce()` retourne un résultat que l’on peut enchaîner avec un autre appel.

```js
array
.map(...)
.filter(...)
.reduce(...);
```

- `.map()` : transforme les éléments
- `.filter()` : garde seulement certains éléments
- `.reduce()` : combine tout dans une seule valeur

L’ordre dans lequel vous les utilisez dépend de ce que vous voulez obtenir ! Passons donc à des exemples concrets pour que vous voyiez le chaining en action.

## Exemples concrets

### Exemple 1 : Doubler les nombres positifs et faire leur somme

On a un tableau de nombres, et on veut :

- ne garder que les positifs (filter)
- doubler chaque nombre (map)
- faire la somme (reduce)

```js
const nombres = [-2, 3, 0, 7, -5];

const resultat = nombres
.filter((n) => n > 0) // Garde [3, 7]
.map((n) => n \* 2) // Transforme en [6, 14]
.reduce((acc, n) => acc + n, 0); // Fait la somme : 6 + 14 = 20

console.log(resultat); // 20
```

**Explication :**

- `.filter()` enlève les nombres négatifs et zéro.
- `.map()` multiplie chaque nombre restant par 2.
- `.reduce()` additionne tous les nombres du tableau pour donner une seule valeur.

### Exemple 2 : Extraire les prénoms en majuscule des utilisateurs actifs

On a un tableau d’utilisateurs avec leur état d’activité.

Objectif :

- ne garder que les utilisateurs actifs (filter)
- récupérer leur prénom (map)
- mettre les prénoms en majuscule (encore un map)

```js
const utilisateurs = [
  { prenom: "alice", actif: true },
  { prenom: "bob", actif: false },
  { prenom: "charlie", actif: true },
];

const prenomsActifs = utilisateurs
  .filter((u) => u.actif) // Garde Alice et Charlie
  .map((u) => u.prenom) // Prend leur prénom ["alice", "charlie"]
  .map((prenom) => prenom.toUpperCase()); // Met en majuscule ["ALICE", "CHARLIE"]

console.log(prenomsActifs); // ["ALICE", "CHARLIE"]
```

**Explication :**

- `.filter()` conserve seulement les utilisateurs avec `actif: true`
- `.map()` extrait les prénoms
- un second `.map()` transforme ces prénoms en majuscules

### Exemple 3 : Calculer la taille moyenne des noms de fichiers .js

Vous avez un tableau de fichiers. Vous voulez :

- ne garder que les fichiers .js (filter),
- mesurer la longueur du nom (map),
- calculer la moyenne (reduce).

```js
const fichiers = ["index.html", "app.js", "main.js", "style.css"];

const moyenneLongueur = fichiers
  .filter((fichier) => fichier.endsWith(".js")) // ["app.js", "main.js"]
  .map((fichier) => fichier.length) // [6, 7]
  .reduce((acc, longueur, _, arr) => acc + longueur / arr.length, 0);

console.log(moyenneLongueur); // 6.5
```

**Explication :**

- `.filter()` conserve seulement les fichiers qui finissent par .js.
- `.map()` calcule la longueur de chaque nom de fichier.
- `.reduce()` additionne toutes les longueurs, mais on divise par le nombre total pour obtenir la moyenne.

L’astuce ici : dans `.reduce()`, on utilise le 4ᵉ paramètre (`arr`), qui est le tableau courant, pour connaître sa longueur. Vous voyez le `_` en 3ème argument de la méthode ? Ça mérite une petite explication !

Pour rappel (n'hésitez pas à lire mon article sur [reduce](reduce)), voici la signature de cette méthode :

```js
array.reduce((accumulateur, valeurCourante, index, tableau) => ..., valeurInitiale);
```

Les paramètres du callback .reduce() sont :

- **accumulateur** : la valeur cumulée au fil des itérations
- **valeurCourante** : l'élément actuel du tableau
- **index (optionnel)** : la position actuelle dans le tableau
- **tableau (optionnel)** : le tableau d'origine sur lequel on travaille

Vous l'aurez compris, `_` correspond à l'index, que je n’utilise pas ici. `_` est une convention qui veut dire : "je reçois cette valeur, mais je ne m’en sers pas.". Ça rend le code plus clair : quelqu’un qui lit votre code (peut-être vous-même dans quelques temps) sait tout de suite que l'index ne compte pas ici.

## Exercices

### Exercice 1 : Doubler les nombres pairs

À partir d'un tableau de nombres, gardez seulement les pairs, puis doublez-les.

```js
const nombres = [1, 2, 3, 4, 5];
// Résultat attendu : [4, 8]
```

<details>
<summary>Solution</summary>

```js
const resultat = nombres
  .filter((n) => n % 2 === 0) // Garde 2 et 4
  .map((n) => n * 2); // Double 2 et 4 => [4, 8]
```

`.filter()` garde les nombres pairs (n % 2 === 0) et `.map()` multiplie chacun par 2.

</details>

### Exercice 2 : Comptabiliser le nombre de prénoms commençant par "A".

Attention, le but ici est d'utiliser le _chaining_ !

```js
const prenoms = ["Alex", "Oscar", "Kimi", "Yuki"];
// Résultat attendu : 1
```

<details>
<summary>Solution</summary>

```js
const nombreA = prenoms
  .filter((prenom) => prenom.startsWith("A")) // ["Alex"]
  .reduce((acc) => acc + 1, 0); // Compte : 1
```

`.filter()` conserve les prénoms qui commencent par "A" et `.reduce()` compte combien il y en a.

</details>

### Exercice 3 : Somme des âges des utilisateurs majeurs

```js
const utilisateurs = [
  { nom: "Valteri", age: 17 },
  { nom: "Lewis", age: 22 },
  { nom: "Charles", age: 18 },
];
// Résultat attendu : 40
```

<details>
<summary>Solution</summary>

```js
const sommeAges = utilisateurs
  .filter((utilisateur) => utilisateur.age >= 18) // Garde Lewis (22) et Charles (18)
  .map((utilisateur) => utilisateur.age) // Extrait les âges [22, 18]
  .reduce((acc, age) => acc + age, 0); // Fait la somme 22 + 18 = 40
```

- `.filter()` conserve les utilisateurs majeurs (18 ans ou plus)
- `.map()` extrait leur âge
- `.reduce()` additionne les âges

</details>

## Bonnes pratiques

- utilisez `.filter()` avant `.map()` si possible : il est plus efficace de d'abord réduire la taille du tableau
- gardez chaque callback simple et lisible
- chaque étape `.map()`, `.filter()`, `.reduce()` doit être autonome : elle ne doit pas dépendre de la suivante

## En résumé

Chainer `.map()`, `.filter()` et `.reduce()` vous permet de transformer, filtrer et agréger vos données de manière élégante.
En maîtrisant cette approche, vous gagnerez en productivité et en lisibilité.

Et petit conseil : commencez toujours par écrire chaque étape séparément si besoin, puis enchaînez-les progressivement.
