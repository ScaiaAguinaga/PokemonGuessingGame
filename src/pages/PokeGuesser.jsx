import { useState, useEffect } from 'react';

function PokeGuesser() {
  const [pokemonName, setPokemonName] = useState(``);
  const [sprite, setSprite] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);

  // Generates a random pokemon name
  const generateRandomPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    setPokemonName(data.results[randomIndex].name);
  };

  // Generates the first random pokemon on page render
  useEffect(() => {
    generateRandomPokemon();
  }, []);

  // Updates the pokemon information displayed whenever name is changed
  useEffect(() => {
    // Fetches data from PokeAPI using the user inputted Pokemon name
    const fetchPokemonData = async () => {
      try {
        // Instantly return if pokemonName is empty
        if (!pokemonName) return;

        // Convert pokemonName to lowercase for API request
        const pokemonUrlName = pokemonName.toLocaleLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonUrlName}`);

        // If rejected, throw a "Pokemon not found" error
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }

        // If resolved, parse it into a JavaScript object
        const data = await response.json();
        // Update displayed pokemon name
        setPokemonName(pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase());
        // Update displayed pokemon sprite
        setSprite(data.sprites.front_default);
        // Update displayed pokemon types
        setPokemonTypes(data.types.map((typeIndex) => typeIndex.type.name));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  return (
    <>
      <img src={sprite} alt="Pokemon sprite"></img>
      <h1>Name: {pokemonName}</h1>
      <ul>
        {pokemonTypes.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
      <button onClick={generateRandomPokemon} className="m-2 flex border-2 border-black">
        Generate Name
      </button>
    </>
  );
}

export default PokeGuesser;
