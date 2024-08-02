// Utilities
import { emptySlot, generatePokemonId, handleReset, updatePokemonInfo, updateUserTypeResponse } from './pokemonUtils';
import * as gameUtils from './gameUtils';
import { fetchPokemonData } from './pokeApi';

// Handles user submission
export const handleSubmit = (pokemon, setPokemon, nextPokemon, setNextPokemon, pokemonLog, setPokemonLog, game, setGame) => {
  // Return early if the user hasn't inputted at least one type
  if (pokemon.userTypeResponse.length < 1) {
    return;
  }

  // Add the current Pokémon ID to the list of guessed Pokémon and increment the submission count
  gameUtils.appendPokemonId(pokemon.id, setGame);
  gameUtils.incrementSubmitCount(setGame);

  // Check if the user correctly guessed all Pokémon types
  // Update the score and streak based on the user's guess
  if (
    (pokemon.types[0] == pokemon.userTypeResponse[0] || pokemon.types[0] == pokemon.userTypeResponse[1]) &&
    (pokemon.types[1] == pokemon.userTypeResponse[0] || pokemon.types[1] == pokemon.userTypeResponse[1])
  ) {
    gameUtils.incrementCorrectCount(setGame);
    gameUtils.incrementStreak(setGame);
  } else {
    gameUtils.resetStreak(setGame);
  }

  // Log the current Pokémon and user's submission
  setPokemonLog([...pokemonLog, pokemon]);

  // Reset the user's submission input
  handleReset(setPokemon);

  // Check if the game should end based on the number of submissions
  if (pokemonLog.length + 1 >= 151) {
    // Update the current Pokémon to the preloaded one
    setPokemon(nextPokemon);

    // Mark the game as over and perform any end-of-game actions
    gameUtils.setGameOver(true, setGame);
    // Record stats
    return;
  }

  // If this is the second-to-last submission, clear the next Pokémon slot to avoid API errors
  if (pokemonLog.length + 1 >= 150) {
    setPokemon(nextPokemon);
    emptySlot(setNextPokemon);
    return;
  }

  // Update the current Pokémon with the preloaded one to reduce downtime
  setPokemon(nextPokemon);

  // Preload the next Pokémon's data
  const preloadedIds = [pokemon.id, nextPokemon.id];

  fetchPokemonData(generatePokemonId(game, preloadedIds)).then((data) => {
    updatePokemonInfo(data, setNextPokemon);
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
