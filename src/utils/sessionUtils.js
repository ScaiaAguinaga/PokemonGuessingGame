import { generatePokemonId, updatePokemonInfo } from './pokemonUtils';
import { fetchPokemonData } from './pokeApi';

export const initializeSession = (setPokemon, setNextPokemon, game) => {
  // Generate the first pokemon of the session
  fetchPokemonData(generatePokemonId(game)).then((data) => {
    updatePokemonInfo(data, setPokemon);
  });
  // Generate the second pokemon of the session
  fetchPokemonData(generatePokemonId(game)).then((data) => {
    updatePokemonInfo(data, setNextPokemon);
  });
};
