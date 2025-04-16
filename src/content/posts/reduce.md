---
title: "Comprendre reduce en Javascript"
pubDate: "2025-04-13"
description: "Apprenons ensemble à utiliser efficacement la méthode reduce en JavaScript grâce à des exemples concrets."
author:
  name: "Philippe Pinceloup"
  url: "https://www.linkedin.com/in/philippe-pinceloup/"
categories: ["frontend"]
---

## Pourquoi utiliser reduce ?

Parmi toutes les méthodes d'arrays, `reduce()` est de loin la plus incomprise et la plus compliquée à comprendre lorsqu'on débute. Elle constitue un outil puissant qui permet de transformer un tableau en une seule valeur. Cette "valeur finale" peut être un nombre, un objet, une chaîne de caractères, voire un autre tableau.

Contrairement à des méthodes comme `.map()` ou `.filter()`, qui retournent un tableau, `.reduce()` permet une transformation plus libre : elle donne le contrôle total sur l’accumulation et le format du résultat final.

## Syntaxe de base

```js
array.reduce(callback, valeurInitiale);
```

Le `callback` est une fonction qui s’exécute sur chaque élément du tableau. Sa signature est la suivante :

```js
(accumulateur, valeurCourante, index, tableau) => nouvelleValeurAccumulateur;
```

- **accumulateur** : la variable qui contient le résultat temporaire à chaque étape. Elle est passée d’une itération à l’autre.
- **valeurCourante** : l’élément actuellement parcouru dans le tableau.
- **index** _(optionnel)_ : l’index de l’élément actuel.
- **tableau** _(optionnel)_ : le tableau d’origine.
- **valeurInitiale** : la valeur de départ de l’accumulateur. Elle est fortement recommandée, notamment pour éviter les comportements imprévus avec des tableaux vides.

## Comment fonctionne reduce étape par étape

Prenons ce tableau simple pour illustrer :

```js
const nombres = [1, 2, 3, 4];
const somme = nombres.reduce((acc, val) => acc + val, 0);
```

### 1. Initialisation

- Le tableau contient : `[1, 2, 3, 4]`
- La **valeur initiale** de l'accumulateur est `0`
- La fonction `callback` va s’exécuter **une fois par élément**

### 2. Étapes de réduction

Voici ce qu’il se passe **à chaque itération** :

| Étape | `val` (valeurCourante) | `acc` (accumulateur) avant | `acc` après |
| ----- | ---------------------- | -------------------------- | ----------- |
| 1     | 1                      | 0                          | 1           |
| 2     | 2                      | 1                          | 3           |
| 3     | 3                      | 3                          | 6           |
| 4     | 4                      | 6                          | 10          |

- À chaque tour, l’accumulateur est mis à jour avec le **résultat du callback**.
- Ce nouveau `acc` est utilisé à l’itération suivante.

### 3. Résultat final

À la fin de toutes les itérations, `.reduce()` **retourne la dernière valeur de l’accumulateur**. Dans cet exemple : 10.

## Cas d’usage concrets

### Cas d’usage 1 : Additionner des valeurs numériques

```js
const notes = [15, 17, 13, 18];
const total = notes.reduce((acc, note) => acc + note, 0);
```

### Étapes détaillées :

| Étape | note | acc avant | acc après |
| ----- | ---- | --------- | --------- |
| 1     | 15   | 0         | 15        |
| 2     | 17   | 15        | 32        |
| 3     | 13   | 32        | 45        |
| 4     | 18   | 45        | 63        |

### Résultat final

```js
63;
```

Le callback additionne la note actuelle à l’accumulateur. C’est un accumulateur numérique classique.

### Cas d’usage 2 : Compter les occurrences d'un élément

```js
const fruits = ["pomme", "banane", "pomme", "orange", "banane", "pomme"];
const compte = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
```

### Étapes détaillées :

| Étape | fruit  | acc avant                            | acc après                            |
| ----- | ------ | ------------------------------------ | ------------------------------------ |
| 1     | pomme  | `{}`                                 | `{ pomme: 1 }`                       |
| 2     | banane | `{ pomme: 1 }`                       | `{ pomme: 1, banane: 1 }`            |
| 3     | pomme  | `{ pomme: 1, banane: 1 }`            | `{ pomme: 2, banane: 1 }`            |
| 4     | orange | `{ pomme: 2, banane: 1 }`            | `{ pomme: 2, banane: 1, orange: 1 }` |
| 5     | banane | `{ pomme: 2, banane: 1, orange: 1 }` | `{ pomme: 2, banane: 2, orange: 1 }` |
| 6     | pomme  | `{ pomme: 2, banane: 2, orange: 1 }` | `{ pomme: 3, banane: 2, orange: 1 }` |

### Résultat final :

```js
{ pomme: 3, banane: 2, orange: 1 }
```

L’accumulateur est un objet. On ajoute ou _incrémente_ la clé correspondant au fruit à chaque passage.

## Cas d’usage 3 : Transformer un tableau en objet clé/valeur

```js
const utilisateurs = [
  { id: 1, nom: "Alice" },
  { id: 2, nom: "Bob" },
  { id: 3, nom: "Charlie" },
];
const utilisateursParId = utilisateurs.reduce((acc, utilisateur) => {
  acc[utilisateur.id] = utilisateur.nom;
  return acc;
}, {});
```

### Étapes détaillées :

| Étape | utilisateur                 | acc avant                  | acc après                                |
| ----- | --------------------------- | -------------------------- | ---------------------------------------- |
| 1     | `{ id: 1, nom: 'Alice' }`   | `{}`                       | `{ 1: 'Alice' }`                         |
| 2     | `{ id: 2, nom: 'Bob' }`     | `{ 1: 'Alice' }`           | `{ 1: 'Alice', 2: 'Bob' }`               |
| 3     | `{ id: 3, nom: 'Charlie' }` | `{ 1: 'Alice', 2: 'Bob' }` | `{ 1: 'Alice', 2: 'Bob', 3: 'Charlie' }` |

### Résultat final :

```js
{ 1: 'Alice', 2: 'Bob', 3: 'Charlie' }
```

L’accumulateur est un objet. À chaque itération, on ajoute une entrée avec l’ID comme clé et le nom comme valeur.

### Cas d’usage 4 : Fusionner plusieurs objets

```js
const tableaux = [{ a: 1 }, { b: 2 }, { c: 3 }];

const fusion = tableaux.reduce((acc, obj) => {
  return { ...acc, ...obj };
}, {});
```

### Étapes détaillées :

| Étape | obj        | acc avant        | acc après              |
| ----- | ---------- | ---------------- | ---------------------- |
| 1     | `{ a: 1 }` | `{}`             | `{ a: 1 }`             |
| 2     | `{ b: 2 }` | `{ a: 1 }`       | `{ a: 1, b: 2 }`       |
| 3     | `{ c: 3 }` | `{ a: 1, b: 2 }` | `{ a: 1, b: 2, c: 3 }` |

### Résultat final :

```js
{ a: 1, b: 2, c: 3 }
```

Chaque objet est copié dans l’accumulateur grâce à la déstructuration (`...`). Le dernier écrase les clés précédentes si elles sont identiques.

## Maintenant, à votre tour !

Le meilleur moyen de comprendre, c'est de pratiquer ! Je vous ai concocté quelques exercices pour que vous puissiez mettre en application ce que nous venons de voir.

### Exercice 1 : Calculer la moyenne d’un tableau

Écrivez une fonction qui prend un tableau de nombres et retourne leur moyenne.

```js
const valeurs = [10, 20, 30, 40];
```

<details>
  <summary>Solution</summary>

```js
function moyenne(tableau) {
  const total = tableau.reduce((acc, val) => acc + val, 0);
  return total / tableau.length;
}

console.log(moyenne(valeurs)); // 25
```

Ici, on commence par additionner toutes les valeurs, puis on divise par la longueur du tableau, soit le nombre d'éléments dans ce tableau, pour obtenir la moyenne.

</details>

### Exercice 2 : Aplatir un tableau de tableaux

Transformez un tableau contenant des sous-tableaux en un seul tableau plat.

```js
const nested = [[1, 2], [3, 4], [5]];
// Résultat attendu : [1, 2, 3, 4, 5]
```

<details>
  <summary>Solution</summary>

```js
const plat = nested.reduce((acc, val) => acc.concat(val), []);
console.log(plat);
// [1, 2, 3, 4, 5]
```

L’accumulateur est un tableau vide. On concatène chaque sous-tableau à mesure qu’on les parcourt.

</details>

### Exercice 3 : Supprimer les doublons d’un tableau

Utilisez `.reduce()` pour retourner un tableau contenant chaque élément **une seule fois**.

```js
const doublons = ["a", "b", "a", "c", "b", "d"];
// Résultat attendu : ['a', 'b', 'c', 'd']
```

<details>
  <summary>Solution</summary>

```js
const sansDoublons = doublons.reduce((acc, val) => {
  if (!acc.includes(val)) {
    acc.push(val);
  }
  return acc;
}, []);

console.log(sansDoublons);
// ['a', 'b', 'c', 'd']
```

L’astuce ici est de vérifier si l’élément existe déjà dans l’accumulateur avant de l’ajouter.

</details>

### Exercice 4 : Grouper des objets par propriété

Groupez un tableau d’objets par une clé spécifique (par catégorie par exemple).

```js
const articles = [
  { nom: "Stylo", categorie: "fournitures" },
  { nom: "Clavier", categorie: "électronique" },
  { nom: "Cahier", categorie: "fournitures" },
  { nom: "Souris", categorie: "électronique" },
];

// Résultat attendu :
// {
//   fournitures: ['Stylo', 'Cahier'],
//   électronique: ['Clavier', 'Souris']
// }
```

<details>
  <summary>Solution</summary>

```js
const groupes = articles.reduce((acc, article) => {
  const cat = article.categorie;
  if (!acc[cat]) {
    acc[cat] = [];
  }
  acc[cat].push(article.nom);
  return acc;
}, {});

console.log(groupes);
```

Ce _pattern_ est utile dans les interfaces où il faut organiser des éléments par section.

</details>

## Bonnes pratiques

- Toujours spécifier une valeur initiale pour l’accumulateur, même si elle peut sembler implicite.
- `.reduce()` est puissant, mais pas toujours la solution la plus lisible. Si une autre méthode fait mieux l’affaire (`.map()`, `.filter()`, ou une boucle), privilégiez la clarté.
- Commentez votre code si l’opération de réduction est complexe. D'expérience, un `.reduce()` mal compris est souvent une source de bugs subtils.

## En résumé

`.reduce()` est une méthode versatile qui permet de condenser un tableau en une valeur unique, avec une logique 100% personnalisable. Que vous cherchiez à additionner des nombres, structurer des objets ou agréger des données, il peut considérablement simplifier votre code.

Prenez le temps de bien comprendre son fonctionnement. Une fois maîtrisé, c’est un véritable gain en lisibilité et expressivité dans vos projets JavaScript.
