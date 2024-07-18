// Adds a single ID to the pokemonIds array in game state
export const appendPokemonId = (appendedId, setGame) => {
  setGame((currentGame) => ({
    ...currentGame,
    pokemonIds: [...currentGame.pokemonIds, appendedId],
  }));
};

// Increments submission count
export const incrementSubmitCount = (setGame) => {
  setGame((currentGame) => ({
    ...currentGame,
    submitCount: ++currentGame.submitCount,
  }));
};

// Increments correct count
export const incrementCorrectCount = (setGame) => {
  setGame((currentGame) => ({
    ...currentGame,
    correctCount: ++currentGame.correctCount,
  }));
};

// Increments streak count
export const incrementStreak = (setGame) => {
  setGame((currentGame) => ({
    ...currentGame,
    streak: ++currentGame.streak,
  }));
};

// Resets streak count
export const resetStreak = (setGame) => {
  setGame((currentGame) => ({
    ...currentGame,
    streak: 0,
  }));
};
