import { generatePokemonId, updatePokemonInfo } from './pokemonUtils';
import { fetchPokemonData } from './pokeApi';

export const initializeSession = (setPokemon, setNextPokemon, game) => {
  // Generate the first pokemon of the session
  const firstId = generatePokemonId(game);
  fetchPokemonData(firstId).then((data) => {
    updatePokemonInfo(data, setPokemon);
  });
  // Generate the second pokemon of the session
  // Second pokemon cannot be the same as the first pokemon
  let secondId;
  do {
    secondId = generatePokemonId(game);
  } while (secondId == firstId);

  fetchPokemonData(secondId).then((data) => {
    updatePokemonInfo(data, setNextPokemon);
  });
};
