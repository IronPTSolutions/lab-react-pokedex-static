// TODO Iteration 4: define PokemonCard
// - Receives a `pokemon` object as a prop
// - Renders id, sprite, name and types
// - Iteration 6: replace the inline <span> for types with a list of <TypeBadge /> components
// - Iteration 9 (bonus): also accept a `captured` boolean prop and add the "captured" CSS class

function PokemonCard(/* TODO destructure props here */) {
  // TODO format the id with leading zeros: 1 -> "001", 25 -> "025", 150 -> "150"
  // Hint: String(pokemon.id).padStart(3, '0')

  return (
    <div className="pokemon-card">
      {/* TODO id */}
      {/* TODO sprite (img with src and alt) */}
      {/* TODO name */}
      {/* TODO types (start with just the first one in iteration 4) */}
    </div>
  );
}

export default PokemonCard;
