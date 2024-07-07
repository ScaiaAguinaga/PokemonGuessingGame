import { formatPokemonName } from "./pokemonUtils";

// Attempts to retrieve data of a given pokemon from PokeAPI
// If successful, returns a JSON object containing pokemon data to be utilized
export const fetchPokemonData = async (pokemonId, setPokemon) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    // Throws error if promise is rejected
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }

    // Parses fetched data into a json object and calls update function
    const data = await response.json();
    updatePokemonInfo(data, setPokemon)
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};

  // Updates state variables with fetched Pokemon data
  const updatePokemonInfo = (data, setPokemon) => {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      name: formatPokemonName(data.name),
      types: data.types.map((typeIndex) => typeIndex.type.name),
      hdSprite: data.sprites.other['official-artwork'].front_default,
      pixelSprite: data.sprites.front_default,
      userTypeResponse: [],
    }));
  };
