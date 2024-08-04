import { resetSession } from '../utils/sessionUtils';

function GamePause({
  onClick,
  timerRef,
  setShowPaused,
  setShowStart,
  setShowGameOver,
  setPokemon,
  setNextPokemon,
  setPokemonLog,
  setGame,
}) {
  const handleRestartClick = (
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
    <>
      <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
        <div className="flex h-1/3 w-1/3 flex-col items-center justify-center gap-y-10 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] shadow-2xl">
          <h1 className="text-5xl font-bold">PAUSED</h1>
          <div className="flex gap-x-4">
            <button
              onClick={onClick}
              className="flex h-[80px] w-[175px] items-center justify-center rounded-[20px] border-4 border-black bg-pokedex-red drop-shadow-xl"
            >
              <h1 className="text-3xl font-bold text-white">Resume</h1>
            </button>
            <button
              onClick={() => {
                handleRestartClick(
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
              className="flex h-[80px] w-[175px] items-center justify-center rounded-[20px] border-4 border-black bg-pokedex-red drop-shadow-xl"
            >
              <h1 className="text-3xl font-bold text-white">Restart</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePause;
