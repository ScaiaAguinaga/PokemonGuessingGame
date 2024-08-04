import { emptySlot, generatePokemonId, updatePokemonInfo } from './pokemonUtils';
import { fetchPokemonData } from './pokeApi';
import { updateTimer } from './gameUtils';

// Initializes all data needed for the beginning of a session
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

// Pauses session and timer
export const pauseSession = (timerRef, setShowPaused) => {
  clearInterval(timerRef.current);
  setShowPaused(true);
};

// Resumes session and timer from pause state
export const resumeSession = (timerRef, game, setGame, setShowPaused, setStartTime) => {
  // Unrender pause pop-up window
  setShowPaused(false);

  // Update clock start time
  setStartTime(Date.now() - game.elapsedTime, setGame);

  // Create timer reference
  timerRef.current = setInterval(() => {
    updateTimer(setGame);
  }, 10); // Update every 10ms
};

export const resetSession = (
  timerRef,
  setShowStart,
  setShowPaused,
  setShowGameOver,
  setPokemon,
  setNextPokemon,
  setPokemonLog,
  setGame,
) => {
  // Reset timer
  clearInterval(timerRef.current);
  // Clear popups and display start popup
  setShowPaused(false);
  setShowGameOver(false);
  setShowStart(true);
  // Reset preloaded pokemon
  emptySlot(setPokemon);
  emptySlot(setNextPokemon);
  // Empty pokemon log
  setPokemonLog([]);
  // Reset game metrics
  setGame({
    pokemonIds: [],
    submitCount: 0,
    correctCount: 0,
    streak: 0,
    startTime: 0,
    currentTime: 0,
    elapsedTime: 0,
    displayTime: '00:00:00',
  });
};
