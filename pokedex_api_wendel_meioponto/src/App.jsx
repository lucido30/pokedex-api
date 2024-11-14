import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [pokemons, setPokemons] = useState([]);
// eu tenho quase certeza que esse código vai bugar mais de 46 vezes...
  const getPokemons = async () => {
    const pokemonArray = [];
    for (let i = 1; i <= 150; i++) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const speciesResponse = await axios.get(response.data.species.url);
        pokemonArray.push({
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default,
          abilities: response.data.abilities,
          evolutions: speciesResponse.data.evolves_from_species
        });
      } catch (error) {
        console.error(`Erro ao buscar o Pokémon ${i}:`, error);
      }
    }
    setPokemons(pokemonArray);
  };
// 0,5 pontos?
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="pokedex">
      <h1>Pokédex API</h1>
      <button className="github-button" onClick={() => window.open("https://github.com/lucido30", "_blank")}>
      </button>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <div className="pokemon-image">
              <img src={pokemon.image} alt={pokemon.name} title={pokemon.name} />
              <div className="ability-tooltip">
                <strong>Habilidades:</strong>
                <ul>
                  {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            {pokemon.evolutions ? (
              <p>evolui de: {pokemon.evolutions.name}</p>
            ) : (
              <p>Sem evoluções</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
