import PokemonList from "./PokemonList";

function PokemonsFav({ pokemons }) {
  return (
    <div className="border border-secondary p-2 mb-3">
      <h3>Favorites</h3>
      <PokemonList pokemons={pokemons} addFav={() => {}} />
    </div>
  );
}

export default PokemonsFav;
