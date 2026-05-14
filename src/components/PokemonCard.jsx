// TODO Iteration 4: define PokemonCard
// - Receives a `pokemon` object as a prop
// - Renders id, sprite, name and types
// - Iteration 6: replace the inline <span> for types with a list of <TypeBadge /> components
// - Iteration 9 (bonus): also accept a `captured` boolean prop and add the "captured" CSS class

import TypeBadge from "./TypeBadge";

function PokemonCard({ pokemon, captured, addFav }) {
  const formattedId = String(pokemon.id).padStart(3, "0");

  return (
    <div
      className={`pokemon-card${captured ? " captured" : ""}`}
      onClick={() => {
        addFav(pokemon);
      }}
    >
      <span className="pokemon-id">#{formattedId}</span>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p className="pokemon-name">{pokemon.name}</p>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <TypeBadge type={type} key={type} />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
