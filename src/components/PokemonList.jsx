import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons, addFav }) {
  return (
    <div className="row">
      {pokemons.map((pokemon) => (
        <div className="col-3 mb-3">
          <PokemonCard pokemon={pokemon} addFav={addFav} />
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
