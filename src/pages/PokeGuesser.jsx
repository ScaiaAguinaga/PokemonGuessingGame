import { useState } from 'react';

function PokeGuesser() {
  const [pokemonName, setPokemonName] = useState(`Venusaur`);
  const [sprite, setSprite] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);

  // Handler for updating the pokemon name state
  const handlePokemonName = (event) => {
    setPokemonName(event.target.value);
  };

  // Handler for updating the sprite image state
  const handleSprite = (sprite) => {
    setSprite(sprite);
  };

  // Handler for detecting Enter key press and fetching pokemon data
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchPokemonData();
    }
  };

  // Fetches data from PokeAPI using the user inputted Pokemon name
  async function fetchPokemonData() {
    try {
      const pokemonUrlName = pokemonName.toLocaleLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonUrlName}`);

      // If the response is not successful, throw a "Pokemon not found" error
      if (!response.ok || pokemonName === '') {
        // Clear sprite image when pokemon not found
        setSprite(null);
        throw new Error('Pokemon not found');
      }

      // If the response is successful, parse it into a JavaScript object
      const data = await response.json();
      updatePokemonDisplay(data);
    } catch (error) {
      console.error(error);
    }
  }

  function updatePokemonDisplay(pokemonData) {
    // Update displayed pokemon name
    setPokemonName(pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase());
    // Update displayed pokemon sprite
    handleSprite(pokemonData.sprites.front_default);
    // Update displayed pokemon types
    setPokemonTypes(pokemonData.types.map((typeIndex) => typeIndex.type.name));
  }

  return (
    <>
      <img id="pokemon-sprite" src={sprite}></img>
      <input
        type="text"
        value={pokemonName}
        onChange={handlePokemonName}
        onKeyDown={handleKeyDown}
        placeholder="Pokemon Name"
        className="m-2 flex border-2 border-black"
      />
      <button onClick={fetchPokemonData} className="m-2 flex border-2 border-black">
        Fetch
      </button>
      <h1 className='flex'>
        Types:
        {pokemonTypes.map((type, index) => (
          <p key={index}>{type}</p>
        ))}
      </h1>
    </>
  );
}

export default PokeGuesser;
