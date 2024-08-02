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

// Sets timer start time
export const setGameOver = (state, setGame) => {
  setGame((currentGame) => ({
    ...currentGame,
    gameOver: state,
  }));
};

// Sets timer start time
export const setStartTime = (time, setGame) => {
  setGame((currentGame) => ({
    ...currentGame,
    startTime: time,
  }));
};

// Updates time settings for game object
export const updateTimer = (setGame) => {
  setGame((currentGame) => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - currentGame.startTime;
    return { ...currentGame, currentTime: currentTime, elapsedTime: elapsedTime, displayTime: formatTime(elapsedTime) };
  });
};

// Formats milliseconds to HH:MM:SS
export const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
