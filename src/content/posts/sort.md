---
title: "Comprendre sort en Javascript"
pubDate: "2025-05-12"
description: "Apprenez à trier vos tableaux avec sort et mettez de l'ordre dans vos tableaux !"
author:
  name: "Philippe Pinceloup"
  url: "https://www.linkedin.com/in/philippe-pinceloup/"
categories: ["frontend"]
---

## Pourquoi utiliser sort ?

En JavaScript, trier un tableau est une opération courante, notamment côté frontend : afficher des produits par prix, classer des utilisateurs, ou ordonner des noms. La méthode `.sort()` est conçue pour cela.

Mais attention : si elle est mal utilisée, elle peut donner des résultats inattendus, surtout avec des nombres ou des chaînes de caractères accentuées. Et surtout, `.sort()` **ne filtre pas**, contrairement à `.filter()`. Il est essentiel de bien distinguer ces deux méthodes.

Voyons ensemble comment tirer le meilleur de `.sort()`.

## La méthode `.sort()` : à quoi sert-elle ?

`.sort()` permet de réorganiser un tableau selon un ordre défini. Elle **modifie le tableau original**.

### Signature de `.sort()`

```js
array.sort([compareFunction]);
```

- `compareFunction` est une **fonction optionnelle**.
- si vous ne la fournissez pas, les éléments seront triés **comme des chaînes de caractères**, selon l’ordre Unicode
- si vous la fournissez, vous pouvez définir votre propre logique de tri

## Fonctionnement de `compareFunction`

Cette fonction reçoit deux éléments du tableau à comparer : `a` et `b`.

Elle doit retourner :

- un nombre négatif si `a` doit venir **avant** `b`
- `0` si `a` et `b` sont égaux
- un nombre positif si `a` doit venir **après** `b`

### Schéma explicatif

Imaginons ce tableau :

```js
const nombres = [5, 2, 9];
```

Et cette fonction de comparaison :

```js
(a, b) => a - b;
```

Voici ce que `.sort()` fait en interne :

| Étape | a   | b   | a - b | Résultat                   |
| ----- | --- | --- | ----- | -------------------------- |
| 1     | 5   | 2   | 3     | 5 vient **après** 2 → swap |
| 2     | 2   | 9   | -7    | 2 vient **avant** 9 → rien |
| 3     | 5   | 9   | -4    | 5 vient **avant** 9 → rien |

Le résultat final sera donc : `[2, 5, 9]`.

## Attention au tri par défaut

Par défaut, `.sort()` **transforme tout en chaînes** pour comparer. Cela peut donc créer des résultats inattendus :

```js
const nombres = [1, 10, 2, 21];

nombres.sort(); // ["1", "10", "2", "21"] devient [1, 10, 2, 21]
```

### Pourquoi ce comportement ?

JavaScript convertit les nombres en chaînes :

- `"10"` vient **avant** `"2"` car `"1"` est plus petit que `"2"` dans l’ordre Unicode
- ce n’est **pas un tri numérique**

🧠 **Solution** : fournissez une fonction `(a, b) => a - b` pour un tri réellement numérique.

## Ne pas confondre avec `.filter()`

`.filter()` et `.sort()` sont deux méthodes souvent confondues, mais elles n’ont pas du tout le même rôle :

| Méthode     | Rôle                    |
| ----------- | ----------------------- |
| `.filter()` | Garde certains éléments |
| `.sort()`   | Réorganise les éléments |

Exemple :

```js
const nombres = [3, 1, 4, 2];

const filtres = nombres.filter((n) => n > 2); // [3, 4]
const tries = nombres.sort((a, b) => a - b); // [1, 2, 3, 4]
```

## Cas concrets

### 1. Trier des nombres

```js
const nombres = [10, 1, 21, 2];

nombres.sort((a, b) => a - b); // [1, 2, 10, 21]
```

`(a - b)` permet un tri numérique croissant. Sans cette fonction, JavaScript aurait trié comme des chaînes de caractères, donnant un résultat inattendu.

### 2. Trier des chaînes simples

```js
const fruits = ["banane", "abricot", "cerise"];

fruits.sort(); // ["abricot", "banane", "cerise"]
```

Ici, le tri Unicode fonctionne bien car il n’y a ni accents ni majuscules.

### 3. Trier des chaînes avec accents et majuscules

```js
const noms = ["Émile", "alice", "Zoé", "élise"];

noms.sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
```

Quelques explications :

- `localeCompare()` trie en respectant les règles linguistiques.
- `"fr"` pour le français.
- `sensitivity: "base"` ignore **la casse et les accents**.

### 4. Trier un tableau d’objets par propriété

```js
const utilisateurs = [
  { nom: "Lance", age: 32 },
  { nom: "Fernando", age: 28 },
  { nom: "Lando", age: 45 },
];

utilisateurs.sort((a, b) => a.age - b.age);
```

On accède à la propriété `age` pour définir l’ordre de tri. `(a.age - b.age)` trie du plus jeune au plus âgé.

## Exercices

### Exercice 1 - Tri de chaînes de caractères

```js
const villes = ["Lyon", "paris", "Marseille", "bordeaux"];
```

Triez ces villes en ordre alphabétique français (sans tenir compte des majuscules).

<details>
<summary>Solution</summary>

```js
villes.sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
// ["bordeaux", "Lyon", "Marseille", "paris"]
```

On utilise `localeCompare()` avec `"fr"` pour un tri correct.

</details>

### Exercice 2 - Tri de nombres

```js
const scores = [100, 50, 75, 200];
```

Triez les scores du plus grand au plus petit.

<details>
<summary>Solution</summary>

```js
scores.sort((a, b) => b - a); // [200, 100, 75, 50]
```

En inversant `(b - a)`, on effectue un tri **décroissant**.

</details>

### Exercice 3 - Tri d'objets

```js
const produits = [
  { nom: "Ordinateur", prix: 900 },
  { nom: "Clavier", prix: 50 },
  { nom: "Écran", prix: 250 },
];
```

Triez ces produits du moins cher au plus cher.

<details>
<summary>Solution</summary>

```js
produits.sort((a, b) => a.prix - b.prix);
```

On compare les prix pour les trier de manière croissante.

</details>

## Bonnes pratiques

- utilisez toujours une fonction `(a, b) => a - b` pour trier des nombres
- utilisez `.slice()` si vous voulez préserver l’original : `const tri = tableau.slice().sort();`
- pour les chaînes accentuées, utilisez `localeCompare()` avec `"fr"` et `sensitivity: "base"`
- ne jamais utiliser `.sort()` pour filtrer des éléments : utilisez `.filter()` pour cela
- n’oubliez pas que `.sort()` modifie le tableau d’origine

## En résumé

La méthode `.sort()` permet de réorganiser les éléments d’un tableau selon un ordre défini, que ce soit pour des nombres, des chaînes ou des objets. Pour éviter les erreurs de tri, il est essentiel d’utiliser une fonction de comparaison appropriée, notamment avec les nombres ou les chaînes en français. N'oubliez pas que `.sort()` modifie le tableau d’origine et qu’elle ne remplace pas `.filter()`, qui sert à sélectionner des éléments.
