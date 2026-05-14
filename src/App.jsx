import Filters from "./components/Filters";
import Navbar from "./components/Navbar";
import PokemonCard from "./components/PokemonCard";
import PokemonList from "./components/PokemonList";
import PokemonsFav from "./components/PokemonsFav";
import allPokemons from "./data";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [favs, setFavs] = useState([]);

  const pokemons = allPokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
      (type === "all" || pokemon.types.includes(type)),
  );

  function addFav(pokemon) {
    if (!favs.includes(pokemon)) {
      setFavs([...favs, pokemon]);
    }
  }

  return (
    <div>
      <Navbar />

      <main className="container ">
        <Filters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
        />
        <PokemonsFav pokemons={favs} />
        <PokemonList pokemons={pokemons} addFav={addFav} />
      </main>
    </div>
  );
}

export default App;
