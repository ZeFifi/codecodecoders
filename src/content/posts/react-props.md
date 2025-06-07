---
title: "Comprendre les props avec React"
pubDate: "2025-06-07"
description: "Les props constituent un élément essentiel de React et permettent de passer des données d'un composant parent à un composant enfant."
author:
  name: "Philippe Pinceloup"
  url: "https://www.linkedin.com/in/philippe-pinceloup/"
categories: ["react"]
---

## Pourquoi utiliser les props en React ?

En React, l’une des forces de la librairie réside dans sa capacité à construire des interfaces réutilisables à partir de composants. Pour cela, il faut pouvoir **transmettre des données** d’un composant parent à ses composants enfants. C’est exactement le rôle des props.

## Qu’est-ce qu’une prop ?

Une _prop_ est une valeur passée d’un composant parent à un composant enfant via des attributs JSX. Cela permet de rendre les composants dynamiques et configurables sans modifier leur code interne.

Les props sont **en lecture seule** : une fois qu'une valeur est passée à un composant via les props, ce dernier ne peut pas la modifier directement. Cela permet de maintenir un flux de données unidirectionnel et d'assurer la prévisibilité des composants. Si un composant a besoin de modifier une donnée reçue via props, il doit généralement utiliser un état local (`useState` par exemple) ou faire remonter un événement vers son parent pour lui demander de modifier la valeur et la repasser en props.

## Comment passer des props

Pour passer des props à un composant React, il suffit d’ajouter des attributs au composant lors de son utilisation dans le JSX. Chaque attribut correspond à une prop, et sa valeur peut être une chaîne, un nombre, une variable, une fonction, ou même un objet. Le composant enfant recevra ces valeurs sous forme de propriétés dans son paramètre `props` (ou via la déstructuration).

### Exemple simple

```jsx
function Bonjour({ prenom }) {
  return <p>Bonjour, {prenom} !</p>;
}

function App() {
  return <Bonjour prenom="Alice" />;
}
```

Ici, le composant `Bonjour` reçoit une prop appelée `prenom`. On lui donne la valeur qu'on veut, ici `Alice`. Le résultat affiché dans le front sera donc "Bonjour, Alice !".

## Cas concrets

### 1. Passer plusieurs props

```jsx
function Profil({ nom, age }) {
  return (
    <p>
      {nom} a {age} ans.
    </p>
  );
}

function App() {
  return <Profil nom="Kimi" age={30} />;
}
```

On peut passer autant de props que nécessaire à un composant, comme des chaînes, des nombres, ou même des fonctions. Ici, le résultat affiché dans le front sera "Kimi a 30 ans".

### 2. Passer une fonction en prop

```jsx
function Bouton({ onClick }) {
  return <button onClick={onClick}>Cliquez-moi</button>;
}

function App() {
  const handleClick = () => alert("Clic détecté !");
  return <Bouton onClick={handleClick} />;
}
```

La fonction `handleClick` est transmise au composant `Bouton` comme une prop, ce qui permet de définir le comportement du bouton depuis le composant parent.

## Bonnes pratiques

- nommez clairement vos props (évitez les abréviations obscures)
- déstructurez les props dans les paramètres de la fonction pour plus de lisibilité (exemple : `function Profil({ nom, age })`)
- utilisez des noms de props cohérents avec leur rôle (`onClick`, `title`, `isVisible`, etc.)

## Mauvaises pratiques à éviter

Avant de plonger dans des exercices, il est important de connaître certaines mauvaises pratiques courantes liées à l’utilisation des props en React. Ces erreurs peuvent rendre votre code plus difficile à maintenir, moins lisible ou introduire des bugs subtils. En voici deux que j'ai noté au fil de mes expériences et qu'il faut éviter lorsque vous manipulez les props dans vos composants.

### Le props drilling

Le props drilling consiste à faire passer une prop à travers plusieurs composants qui n’en ont pas l’usage, juste pour l’utiliser dans un composant plus bas dans la hiérarchie.

```jsx
// Composant parent
function App() {
  const username = "Alice";
  return <Layout username={username} />;
}

// Niveau 2
function Layout({ username }) {
  return <Sidebar username={username} />;
}

// Niveau 3
function Sidebar({ username }) {
  return <Profile username={username} />;
}

// Niveau 4
function Profile({ username }) {
  return <p>Bienvenue, {username} !</p>;
}
```

Voici la hiérarchie dans notre exemple ci-dessus : App > Layout > Sidebar > Profile. Bien qu'on n'utilise username que dans Profile, on le passe du composant le plus haut jusqu'au plus bas. Ce type de structure rend le code plus difficile à maintenir. Pour éviter cela, on peut utiliser un contexte ou remonter la logique au plus près de l'endroit où elle est utilisée.

### Passer un objet complet quand un champ suffit

Évitez de passer un objet entier à un composant si ce dernier n’utilise qu’une seule de ses propriétés. Cela rend le composant plus couplé à la structure externe.

```jsx
// À ne pas faire
function App() {
  const utilisateur = { nom: "Alice", age: 30 };
  // pourquoi passer l'objet entier à Profil alors qu'on n'a besoin que du nom ?
  return <Profil nom={utilisateur} />;
}

// Pas bon :
function Profil({ utilisateur }) {
  return <p>{utilisateur.nom}</p>;
}

// Recommandé
function App() {
  const utilisateur = { nom: "Alice", age: 30 };
  // ne passons en props que ce dont nous avons besoin !
  return <Profil nom={utilisateur.nom} />;
}

// Là on est bien !
function Profil({ nom }) {
  return <p>{nom}</p>;
}
```

## Maintenant, à votre tour !

Le meilleur moyen de comprendre, c’est de pratiquer ! Je vous ai concocté quelques exercices pour que vous puissiez mettre en application ce que nous venons de voir.

### Exercice 1 – Afficher un prénom

Créez un composant `Salutation` qui prend une prop `prenom` et affiche `Bonjour, {prenom} !` dans un paragraphe.

<details>
<summary>Solution</summary>

```jsx
function Salutation({ prenom }) {
  return <p>Bonjour, {prenom} !</p>;
}

function App() {
  return <Salutation prenom="Claire" />;
}
```

La prop `prenom` est passée au composant `Salutation`, qui l’affiche dynamiquement.

</details>

### Exercice 2 – Bouton personnalisé

Créez un composant `Bouton` qui reçoit une prop `texte` et une prop `onClick`. Le bouton doit afficher le texte reçu et déclencher la fonction `onClick` au clic.

<details>
<summary>Solution</summary>

```jsx
function App() {
  const disBonjour = () => alert("Bonjour !");
  return <Bouton texte="Cliquez ici" onClick={disBonjour} />;
}

function Bouton({ texte, onClick }) {
  return <button onClick={onClick}>{texte}</button>;
}
```

Le composant reçoit du texte et une fonction à exécuter au clic, ce qui permet de le réutiliser avec différents comportements.

</details>

### Exercice 3 – Passer plusieurs props

Créez un composant `Utilisateur` qui prend les props `nom` et `ville`, et affiche une phrase comme : "{Nom} habite à {Ville}."

<details>
<summary>Solution</summary>

```jsx
function Utilisateur({ nom, ville }) {
  return (
    <p>
      {nom} habite à {ville}.
    </p>
  );
}

function App() {
  return <Utilisateur nom="Thomas" ville="Lyon" />;
}
```

Les deux props sont utilisées pour construire une phrase dynamique.

</details>

## En résumé

Les props permettent de faire circuler des données entre les composants avec React. Elles rendent les composants dynamiques, modulaires et réutilisables. Il est important de bien les nommer, de les utiliser quand nécessaire, et d’éviter les mauvaises pratiques comme le props drilling ou le passage d’objets complets non nécessaires.
