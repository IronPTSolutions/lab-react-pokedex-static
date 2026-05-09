![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | React IronDex (Static)

## Introducción

Hace unos días construiste una **Pokédex** manipulando el DOM con JavaScript puro y aplicando el patrón _State & Render_. Ahora vas a reconstruir la **Fase 1** de aquella aplicación, pero esta vez usando **React + Vite**.

En este lab **NO usarás estado** todavía. La aplicación será **100% estática**: simplemente recibe los datos y los pinta en pantalla. El objetivo es practicar los tres conceptos clave que has visto hoy:

- **Componentes** (descomponer la UI en piezas reutilizables)
- **Props** (pasar datos del padre al hijo)
- **Listas y `key`** (renderizar arrays con `.map`)
- **Conditional Rendering** (renderizar UI según condiciones)

Más adelante, cuando aprendas `useState`, le añadirás la lógica de captura, búsqueda y filtros.

## Requisitos

- Haz **fork** de este repo a tu cuenta de GitHub.
- **Clona** el fork a tu máquina local.
- Abre el proyecto en VS Code.
- Instala dependencias y arranca el dev server:

```bash
npm install
npm run dev
```

Verás la página en `http://localhost:5173` con solo un título "IronDex". Tu trabajo es construir el resto.

## Entrega

Al terminar:

```bash
git add .
git commit -m "done"
git push origin main
```

Crea un **Pull Request** de tu fork hacia el repositorio original.

## Estructura del proyecto

```
lab-react-pokedex-static/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # punto de entrada (no tocar)
    ├── App.jsx               # componente raíz — TÚ trabajas aquí
    ├── index.css             # estilos completos (no necesitas tocar)
    ├── data.js               # array con los 150 Pokémon (no modificar)
    └── components/
        ├── PokemonCard.jsx   # skeleton — implementar
        ├── TypeBadge.jsx     # skeleton — implementar
        └── Header.jsx        # skeleton — implementar (bonus)
```

Cada Pokémon tiene esta forma:

```js
{
  id: 25,
  name: 'Pikachu',
  types: ['Electric'],
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
}
```

---

## Iteración 1 — Renderizar el primer Pokémon

Antes de pintar los 150, pintemos uno solo para asegurarnos de que los datos llegan bien.

En `src/App.jsx`, importa el array y renderiza el sprite y el nombre del primer Pokémon directamente:

```jsx
import pokemon from './data';

function App() {
  // TODO coge el primer Pokémon del array y renderiza su nombre y su sprite
  return (
    <div>
      <h1>IronDex</h1>
      {/* tu código aquí */}
    </div>
  );
}
```

<details>
<summary>💡 Solución</summary>

```jsx
import pokemon from './data';

function App() {
  const first = pokemon[0];

  return (
    <div>
      <h1>IronDex</h1>
      <img src={first.sprite} alt={first.name} />
      <p>{first.name}</p>
    </div>
  );
}

export default App;
```

Recuerda: dentro de JSX las expresiones JS van entre llaves `{ }`.

</details>

---

## Iteración 2 — Crear el componente `PokemonCard`

Renderizar un Pokémon directamente en `App` no escala. Vamos a crear un componente dedicado.

Abre `src/components/PokemonCard.jsx`. El componente debe:

- Recibir un Pokémon por props (`pokemon`).
- Devolver una tarjeta con id, sprite, nombre y tipos (de momento, solo el primer tipo).

> **Pista:** Para formatear el id con ceros (001, 025, 150) usa `String(pokemon.id).padStart(3, '0')`.

Después, en `src/App.jsx`, importa `PokemonCard` y renderiza solo el primer Pokémon usando el componente:

```jsx
<PokemonCard pokemon={pokemon[0]} />
```

<details>
<summary>💡 Solución</summary>

```jsx
// src/components/PokemonCard.jsx
function PokemonCard({ pokemon }) {
  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <div className="pokemon-card">
      <span className="pokemon-id">#{formattedId}</span>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p className="pokemon-name">{pokemon.name}</p>
      <div className="pokemon-types">
        <span>{pokemon.types[0]}</span>
      </div>
    </div>
  );
}

export default PokemonCard;
```

```jsx
// src/App.jsx
import pokemon from './data';
import PokemonCard from './components/PokemonCard';

function App() {
  return (
    <div>
      <h1>IronDex</h1>
      <PokemonCard pokemon={pokemon[0]} />
    </div>
  );
}

export default App;
```

Las props son **read-only**: el componente nunca modifica `pokemon`. Solo lo lee y lo pinta.

</details>

---

## Iteración 3 — Renderizar los 150 Pokémon (listas y `key`)

Ahora que `PokemonCard` funciona con uno, vamos a pintar los 150 con `.map()`.

En `src/App.jsx`, envuelve la lista en un `<div className="pokemon-list">` para que los estilos del CSS te coloquen las tarjetas en una rejilla:

```jsx
<div className="pokemon-list">
  {/* TODO: recorre el array pokemon con .map y renderiza un PokemonCard por cada uno */}
  {/* TODO: no olvides la prop key */}
</div>
```

<details>
<summary>💡 Solución</summary>

```jsx
import pokemon from './data';
import PokemonCard from './components/PokemonCard';

function App() {
  return (
    <div>
      <h1>IronDex</h1>
      <div className="pokemon-list">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

`key` es una prop **especial** que React usa para identificar cada elemento entre renders. Debe ser **única entre hermanos**. Aquí usamos `p.id` porque es estable y único — usar el índice del array (`idx`) sería mala idea si la lista pudiera reordenarse o filtrarse.

Si abres la consola del navegador y no pones `key`, React te avisará con un warning.

</details>

---

## Iteración 4 — Componente `TypeBadge` (un tipo, una badge)

Cada Pokémon puede tener uno o varios tipos. Vamos a crear un componente dedicado para pintar cada tipo, y luego renderizar uno por cada tipo del Pokémon.

Abre `src/components/TypeBadge.jsx` y completa el componente. Debe recibir una prop `type` (string) y devolver:

```html
<span class="type-badge type-Fire">Fire</span>
```

Después, modifica `PokemonCard` para que en lugar de `<span>{pokemon.types[0]}</span>` renderice un `<TypeBadge />` por cada tipo del Pokémon usando `.map()`.

<details>
<summary>💡 Solución</summary>

```jsx
// src/components/TypeBadge.jsx
function TypeBadge({ type }) {
  return (
    <span className={`type-badge type-${type}`}>
      {type}
    </span>
  );
}

export default TypeBadge;
```

```jsx
// src/components/PokemonCard.jsx
import TypeBadge from './TypeBadge';

function PokemonCard({ pokemon }) {
  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <div className="pokemon-card">
      <span className="pokemon-id">#{formattedId}</span>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p className="pokemon-name">{pokemon.name}</p>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
```

Fíjate que volvemos a usar `key`, esta vez en la lista de tipos. La regla aplica **siempre que hagas `.map()` en JSX**.

Las plantillas con backticks (`` `type-${type}` ``) son JS estándar; aquí se usan dentro de llaves `{ }` para construir el `className` dinámicamente.

</details>

---

## Iteración 5 — `Header` con contador (Bonus, conditional rendering)

Abre `src/components/Header.jsx` y completa el componente. Debe recibir como prop `count` (el número total de Pokémon) y mostrar:

- Si `count > 0`: `"<count> pokemon en la lista"`
- Si `count === 0`: `"Sin pokemon disponibles"`

Después, en `App.jsx`, sustituye el `<h1>IronDex</h1>` por `<Header count={pokemon.length} />`.

Para probar el caso `count === 0`, cambia temporalmente la prop a `<Header count={0} />` y comprueba que ves el otro mensaje.

<details>
<summary>💡 Solución</summary>

```jsx
// src/components/Header.jsx
function Header({ count }) {
  return (
    <header>
      <h1>IronDex</h1>
      {count > 0 ? (
        <p>{count} pokemon en la lista</p>
      ) : (
        <p>Sin pokemon disponibles</p>
      )}
    </header>
  );
}

export default Header;
```

```jsx
// src/App.jsx
import pokemon from './data';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';

function App() {
  return (
    <div>
      <Header count={pokemon.length} />
      <div className="pokemon-list">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

Esto es **conditional rendering** con el operador ternario. También podrías usarlo con `&&`:

```jsx
{count > 0 && <p>{count} pokemon en la lista</p>}
{count === 0 && <p>Sin pokemon disponibles</p>}
```

</details>

---

## Iteración 6 — Marcar capturados visualmente (Bonus)

Aún no tenemos estado, pero podemos simular la idea de "capturado" pasando un boolean por props.

Modifica `PokemonCard` para que reciba una prop opcional `captured`. Si `captured` es `true`, añade la clase CSS `captured` a la tarjeta (la clase ya está definida en el CSS y aplica un borde dorado).

Para probarlo, en `App.jsx` marca a Pikachu (id 25) como capturado:

```jsx
{pokemon.map((p) => (
  <PokemonCard
    key={p.id}
    pokemon={p}
    captured={p.id === 25}
  />
))}
```

<details>
<summary>💡 Solución</summary>

```jsx
function PokemonCard({ pokemon, captured }) {
  const formattedId = String(pokemon.id).padStart(3, '0');
  const className = `pokemon-card${captured ? ' captured' : ''}`;

  return (
    <div className={className}>
      <span className="pokemon-id">#{formattedId}</span>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p className="pokemon-name">{pokemon.name}</p>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  );
}
```

Cuando aprendas `useState`, este boolean dejará de venir hardcodeado por props y vendrá calculado del estado (`state.captured.includes(pokemon.id)`). Pero el componente `PokemonCard` no necesita cambiar — seguirá recibiendo `captured` como prop. Esa es la magia: **componentes "tontos" que solo dependen de sus props**.

</details>

---

## Cierre

Has construido una Pokédex en React **sin escribir ni una línea de estado**. Recapitulando:

- Has descompuesto la UI en 3 componentes: `Header`, `PokemonCard`, `TypeBadge`.
- Cada componente recibe sus datos por **props** y los pinta. No guarda nada.
- Has usado `.map()` con `key` para renderizar listas (Pokémon, tipos).
- Has hecho **conditional rendering** con ternario y con `&&`.
- Has visto que las props son **read-only**: nadie modifica los datos que recibe.

En el siguiente lab le añadirás `useState` para implementar la captura, búsqueda y filtros con clicks reales — y verás lo poco que tienen que cambiar tus componentes presentacionales.

Happy coding! :heart:
