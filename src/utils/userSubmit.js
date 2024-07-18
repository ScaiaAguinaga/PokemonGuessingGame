// Utilities
import { generatePokemonId, handleReset, updatePokemonInfo, updateUserTypeResponse } from './pokemonUtils';
import * as gameUtils from './gameUtils';
import { fetchPokemonData } from './pokeApi';

// Compares user submission to answer
export const handleSubmit = (pokemon, setPokemon, pokemonLog, setPokemonLog, game, setGame) => {
  // Return and dont submit if user has not inputted a type
  if (pokemon.userTypeResponse.length < 1) {
    return;
  }

  // Add pokemon id to game id list and increment guess count
  gameUtils.appendPokemonId(pokemon.id, setGame);
  gameUtils.incrementSubmitCount(setGame);

  // If user correctly guesses all types increment score and streak
  if (
    (pokemon.types[0] == pokemon.userTypeResponse[0] || pokemon.types[0] == pokemon.userTypeResponse[1]) &&
    (pokemon.types[1] == pokemon.userTypeResponse[0] || pokemon.types[1] == pokemon.userTypeResponse[1])
  ) {
    gameUtils.incrementCorrectCount(setGame);
    gameUtils.incrementStreak(setGame);
  } else {
    gameUtils.resetStreak(setGame);
  }

  // Adds user submission to pokemon log
  setPokemonLog([...pokemonLog, pokemon]);
  // Resets submission zone for next response
  handleReset(setPokemon);
  // Generates the next Pokemon ID
  generatePokemonId(setPokemon, game);
  // fetches and updates the next Pokemon's data
  fetchPokemonData(pokemon.id).then((data) => {
    updatePokemonInfo(data, setPokemon);
  });
};

// Adds and removes types from user answer on drag end
export const handleDragEnd = (event, pokemon, setPokemon) => {
  // If dropped in user-submit and from type-buttons add type to useranswer
  if (event.over.id === 'user-submit' && event.active.data.current === 'type-buttons') {
    // Checks if type is already in userAnswer
    if (pokemon.userTypeResponse.length < 2 && !pokemon.userTypeResponse.includes(event.active.id))
      updateUserTypeResponse(pokemon, setPokemon, 'add', event.active.id);
  }
  // If dropped in type-buttons and from user-submit remove type from userAnswer
  if (event.over.id === 'type-buttons' && event.active.data.current === 'user-submit') {
    updateUserTypeResponse(pokemon, setPokemon, 'remove', event.active.id);
  }
};
