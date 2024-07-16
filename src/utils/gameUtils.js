import { generateRandomPokemon } from './pokemonUtils';

// Updates userTypeRespons
export const updateUserTypeResponse = (pokemon, setPokemon, operation, type) => {
  if (operation === 'add') {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      userTypeResponse: [...pokemon.userTypeResponse, type],
    }));
  }
  if (operation == 'remove') {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      userTypeResponse: pokemon.userTypeResponse.filter((answerType) => answerType !== type.slice(4)),
    }));
  }
};

// Resets the types selected in the user submission zone
export const handleReset = (setPokemon) => {
  setPokemon((currentPokemon) => ({
    ...currentPokemon,
    userTypeResponse: [],
  }));
};

// Compares user submission to answer
export const handleSubmit = (
  clickedSubmit,
  setClickedSubmit,
  pokemon,
  setPokemon,
  pokemonLog,
  setPokemonLog,
  game,
  setGame,
) => {
  // Sets a 0.75 second buffer between submission to avoid spam or misclicks
  if (!clickedSubmit) {
    setClickedSubmit(true);
    setTimeout(() => {
      setClickedSubmit(false);
    }, 750);

    // Return and dont submit if user has not inputted a type
    if (pokemon.userTypeResponse.length < 1) {
      return;
    }

    // Does nothing if game completion has been met
    // Set length to the amount of pokemon to be guessed
    // Other game completion check is in pokemonUtils {generateRandomPokemon}
    if (game.pokemonIds.length == 151) {
      console.log('Game has been completed');
      return;
    }

    // Add pokemon id to game id list and increment guess count
    setGame((currentGame) => ({
      ...currentGame,
      pokemonIds: [...currentGame.pokemonIds, pokemon.id],
      submitCount: currentGame.submitCount + 1,
    }));

    // If user correctly guesses all types increment score and streak
    if (
      (pokemon.types[0] == pokemon.userTypeResponse[0] || pokemon.types[0] == pokemon.userTypeResponse[1]) &&
      (pokemon.types[1] == pokemon.userTypeResponse[0] || pokemon.types[1] == pokemon.userTypeResponse[1])
    ) {
      setGame((currentGame) => ({
        ...currentGame,
        correctCount: currentGame.correctCount + 1,
        streak: currentGame.streak + 1,
      }));
    } else {
      setGame((currentGame) => ({
        ...currentGame,
        streak: 0,
      }));
    }

    // Adds user submission to pokemon log and generates a new pokemon
    setPokemonLog([...pokemonLog, pokemon]);
    handleReset(setPokemon);
    generateRandomPokemon(setPokemon, game);
  }
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
