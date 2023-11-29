import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [hasRendered,sethasRendered] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500").then(response => response.json());
      const results = data.results;
      const pokeData = await Promise.all(results.map(el => fetch(el.url).then(res => res.json())));
      setPokemons(pokeData);
      sethasRendered(true)
    };

    fetchData();
  }, []);

  const searchFunc = () => {
    setSearchTerm(inputRef.current.value);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <section>
      <input
        placeholder="Search by Name"
        ref={inputRef}
        onChange={searchFunc}
      />
      <div className="container">
        {filteredPokemons.length === 0 && hasRendered? (
          <p className="not-found">Ytenc Pokedex Chka Ape !!!</p>
        ) : (
          filteredPokemons.map(pokemon => (
            <div className="poke-divs" key={pokemon.id}>
              <h1>{pokemon.name}</h1>
              <h3>ID: {pokemon.id}</h3>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <img src={pokemon.sprites.front_default} alt="" />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default App;
