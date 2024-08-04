// Components
import { pauseSession, resetSession } from '../utils/sessionUtils';
import GameButton from './GameButton';

function GameStats({
  game,
  timerRef,
  setShowStart,
  setShowPaused,
  setShowGameOver,
  setPokemon,
  setNextPokemon,
  setPokemonLog,
  setGame,
}) {
  // On pause we want to clear the interval -> show pause screen -> resume button
  // continues the timer by setting start time to Date.now() - elapsed time
  // Then continues updating time with current time

  const handlePauseClick = () => {
    pauseSession(timerRef, setShowPaused);
  };

  const handleResetClick = (
    timerRef,
    setShowStart,
    setShowPaused,
    setShowGameOver,
    setPokemon,
    setNextPokemon,
    setPokemonLog,
    setGame,
  ) => {
    resetSession(timerRef, setShowStart, setShowPaused, setShowGameOver, setPokemon, setNextPokemon, setPokemonLog, setGame);
  };

  return (
    <div className="mt-5 grid h-full grid-cols-2 gap-y-5 text-center">
      {/* Displays user progress for current session */}
      <div className="col-span-2">
        <h1 className="mb-3 text-5xl font-bold">Progress</h1>
        <h2 className="text-4xl">{game.submitCount} / 151</h2>
      </div>
      {/* Displays user score for current session */}
      <div>
        <h2 className="text-4xl font-bold">Score</h2>
        <h3 className="text-3xl">{game.correctCount}</h3>
      </div>
      {/* Displays user streak of correct answers */}
      <div>
        <h2 className="text-4xl font-bold">Streak</h2>
        <h3 className="text-3xl">{game.streak}</h3>
      </div>
      {/* Displays user playtime of current session */}
      <div className="col-span-2">
        <h2 className="text-4xl">
          <span className="font-bold">TIME:</span> {game.displayTime}
        </h2>
      </div>
      {/* Buttons for user to pause or reset their session */}
      <div className="col-span-2 flex items-end justify-center gap-10">
        <GameButton label={'pause'} onClick={handlePauseClick} />
        <GameButton
          label={'restart'}
          onClick={() => {
            handleResetClick(
              timerRef,
              setShowStart,
              setShowPaused,
              setShowGameOver,
              setPokemon,
              setNextPokemon,
              setPokemonLog,
              setGame,
            );
          }}
        />
      </div>
    </div>
  );
}

export default GameStats;
