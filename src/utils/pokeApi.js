// Attempts to retrieve data of a given pokemon from PokeAPI
// If successful, returns a JSON object containing pokemon data to be utilized
export const fetchPokemonData = async (pokemonId) => {
  if (pokemonId === 0) {
    return;
  }
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    // Throws error if promise is rejected
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }

    // Parses fetched data into a json object and calls update function
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};
