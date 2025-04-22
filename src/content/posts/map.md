---
title: "Comprendre map en JavaScript"
pubDate: "2025-04-16"
description: "Apprenons ensemble à utiliser efficacement la méthode map en JavaScript grâce à des exemples concrets."
author:
  name: "Philippe Pinceloup"
  url: "[https://www.linkedin.com/in/philippe-pinceloup/](https://www.linkedin.com/in/philippe-pinceloup/)"
categories: ["frontend"]
---

## Pourquoi utiliser map ?

`.map()` fait partie des méthodes fondamentales à connaître lorsqu’on travaille avec des tableaux (ou _arrays_) en JavaScript. Elle permet de transformer un tableau **élément par élément**, pour en produire un **nouveau**, de **même longueur**, selon une logique que vous définissez.

Contrairement à `.reduce()` (voir mon article [ici](reduce)), qui vise une seule valeur finale, `.map()` est utilisée quand on souhaite **conserver la structure d’un tableau**, mais en **modifiant le contenu** de ses éléments.

## Syntaxe de base

```js
array.map(callback);
```

Le `callback` est une fonction appelée pour chaque élément du tableau. Sa signature :

```js
(valeurCourante, index, tableau) => nouvelleValeur;
```

- **valeurCourante** : l’élément actuel.
- **index** _(optionnel)_ : sa position dans le tableau.
- **tableau** _(optionnel)_ : le tableau d’origine.

`.map()` **retourne un nouveau tableau**, sans modifier celui d’origine.

## Comment fonctionne map étape par étape

Prenons un exemple simple :

```js
const nombres = [1, 2, 3];
const doublés = nombres.map((nombre) => nombre * 2);
```

Le paramètre du callback est généralement le singulier du nom de l'array. Ici, nous avons notre tableau `nombres` et nous appliquons donc une transformation pour chaque `nombre` (une multiplication par 2 dans notre exemple). Si notre array s'était nommé `animaux`, on aurait nommé notre paramètre `animal`. Vous pouvez l'appeler comme vous le souhaitez, mais c'est une convention qui rend le code lisible.

### Étapes de transformation

| Étape | valeurCourante | retour du callback | résultat  |
| ----- | -------------- | ------------------ | --------- |
| 1     | 1              | 2                  | [2]       |
| 2     | 2              | 4                  | [2, 4]    |
| 3     | 3              | 6                  | [2, 4, 6] |

Chaque élément est transformé, et le nouveau tableau est construit avec les valeurs retournées.

## Cas d’usage concrets

### Cas d’usage 1 : Transformer des nombres

```js
const températuresC = [0, 10, 20];
const températuresF = températuresC.map((c) => (c * 9) / 5 + 32);
```

**Résultat :** `[32, 50, 68]`

Ici, chaque élément du tableau est multiplié par 9, divisé par 5 et 32 est ajouté.

### Cas d’usage 2 : Extraire une propriété d’objets

```js
const utilisateurs = [
  { prenom: "Alice", age: 25 },
  { prenom: "Bob", age: 30 },
];

const prenoms = utilisateurs.map((utilisateur) => utilisateur.prenom);
```

**Résultat :** `["Alice", "Bob"]`

Là, on récupère une propriété spécifique de chaque objet. On part de notre tableau `utilisateurs` et pour chaque `utilisateur` on affiche le prénom.

### Cas d’usage 3 : Formater des données

```js
const fichiers = ["index.html", "style.css", "app.js"];

const avecExtension = fichiers.map((fichier) => {
  const extension = fichier.split(".").pop();
  return { nom: fichier, extension };
});
```

**Résultat :**

```js
[
  { nom: "index.html", extension: "html" },
  { nom: "style.css", extension: "css" },
  { nom: "app.js", extension: "js" },
];
```

Exemple un peu plus technique ! Ici, on transforme chaque _string_ du tableau en objet contenant plus d’infos.
On a donc un _array_ `fichiers` qui contient des noms de fichiers. On crée ensuite une constante `extension` : `.split(".").pop()` permet d'obtenir ce qui vient après le point. Donc respectivement pour chaque fichier `html`, `css` et `js`.

Enfin, on retourne un objet qui contient les clés `nom` (le nom complet du fichier) et `extension` pour chacun des fichiers.

## Maintenant, à votre tour !

Le meilleur moyen de comprendre, c’est de pratiquer ! Je vous ai concocté quelques exercices pour que vous puissiez mettre en application ce que nous venons de voir.

### Exercice 1 : Incrémenter chaque nombre

Utilisez `.map()` pour ajouter +1 à chaque nombre de l'_array_ `base`.

```js
const base = [1, 2, 3];
// Résultat attendu : [2, 3, 4]
```

<details>
  <summary>Solution</summary>

```js
const resultat = base.map((nombre) => nombre + 1);
```

À chaque nombre de l'_array_ `base` on ajoute +1.

</details>

### Exercice 2 : Mettre en majuscules

Écrivez chaque prénom en majuscule.  
**Astuce** : il vous faudra utiliser une méthode native Javascript qui s'applique aux _strings_.

```js
const prénoms = ["alice", "bob", "charlie"];
// Résultat attendu : ["ALICE", "BOB", "CHARLIE"]
```

<details>
  <summary>Solution</summary>

```js
const majuscules = prenoms.map((prenom) => prenom.toUpperCase());
```

À chaque prénom de l'_array_ `prenoms` on applique la méthode `.topUpperCase()` qui met en majuscules la _string_ à laquelle elle est appliquée.

</details>

### Exercice 3 : Ajouter un index comme ID

À partir d'un tableau contenant des prénoms, créez un nouvel array d'objets. Chaque objet devra contenir deux informations :

- une clé `id` correspondant au numéro du prénom dans la liste, en commençant par 1
- une clé `prenom` contenant le prénom

_Astuce_ : rappelez-vous que dans un _array_, le premier élément a un index qui est 0. Pour que vos identifiants commencent à 1, il suffit d'ajouter 1 à cet index.

```js
const prenoms = ["Luc", "Emma"];
// Résultat attendu : [{ id: 1, prenom: "Luc" }, { id: 2, prenom: "Emma" }]
```

<details>
  <summary>Solution</summary>

```js
const avecId = prenoms.map((prenom, index) => ({ id: index + 1, prenom }));
```

La méthode `.map()` parcourt chaque prénom du tableau `prenoms`. Pour chaque prénom, elle retourne un nouvel objet avec :

- une clé `id`, qui est l'index du prénom dans la liste + 1
- une clé `prenom`, qui contient le prénom

</details>

### Exercice 4 : Reconstituer des phrases

Ajoutez "Bonjour" devant chaque prénom.

```js
const prenoms = ["Alice", "Bob"];
// Résultat attendu : ["Bonjour Alice", "Bonjour Bob"]
```

<details>
  <summary>Solution</summary>

```js
const salutations = prenoms.map((prenom) => `Bonjour ${prenom}`);
```

Ici, pour chaque prénom de l'_array_ `prenoms`, on ajoute le mot "Bonjour". Comme on l'a déjà vu, `.map()` parcourt chaque élément du tableau, on utilise donc une _template string_ (`${}`) pour y ajouter la valeur en cours du prénom.

</details>

## Bonnes pratiques

- `.map()` **doit retourner une valeur** à chaque itération. Sinon, le tableau résultant contiendra des `undefined`.
- Préférez `.map()` à une boucle `for` lorsque vous voulez **créer un nouveau tableau transformé à partir d’un tableau source**.  
  `.map()` **ne modifie jamais le tableau d’origine** : il retourne toujours un nouveau tableau.
- Ne modifiez pas les éléments du tableau original dans le `callback`. `.map()` doit être **purement fonctionnelle**.
- Un point fort de `.map()` (comme d’autres méthodes d’array) est qu’on peut **chaîner** plusieurs méthodes pour écrire du code plus expressif et lisible.

## En résumé

`.map()` est un outil puissant et élégant pour transformer des tableaux. Elle vous permet d’écrire du code plus lisible, plus concis et souvent plus performant. Une fois bien comprise, elle devient un réflexe naturel pour toutes vos manipulations de données.

Prenez le temps de vous entraîner : les transformations de tableau sont omniprésentes en développement frontend, et `.map()` est souvent le point de départ idéal. Lorsque vous maîtriserez cette méthode, pourquoi ne pas apprendre à utiliser [reduce](reduce) ?
