import { useState } from 'react';

function PokeGuesser() {
  const [pokemonName, setPokemonName] = useState(``);
  const [sprite, setSprite] = useState('');

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
      // Update the displayed Pokemon sprite
      handleSprite(data.sprites.front_default);
    } catch (error) {
      // If an error occurs during the fetch or parsing, log the error to the console
      console.error(error);
    }
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
    </>
  );
}

export default PokeGuesser;
