import { resetSession } from '../utils/sessionUtils';

function GameEnd({
  game,
  timerRef,
  setShowPaused,
  setShowStart,
  setShowGameOver,
  setPokemon,
  setNextPokemon,
  setPokemonLog,
  setGame,
}) {
  const handleReplayClick = () => {
    resetSession(timerRef, setShowStart, setShowPaused, setShowGameOver, setPokemon, setNextPokemon, setPokemonLog, setGame);
  };

  const endScreenTimeFormat = (timeString) => {
    if (timeString[0] === '0' && timeString[1] === '0') {
      return timeString.slice(3);
    } else return timeString;
  };
  return (
    <>
      <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
        <div className="flex h-1/3 w-1/3 flex-col items-center justify-center gap-y-5 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] shadow-2xl">
          <h1 className="text-5xl font-bold text-pokedex-red">Thanks for playing!</h1>
          <h2 className="text-4xl">Score: {game.correctCount}</h2>
          <h2 className="text-4xl">Time: {endScreenTimeFormat(game.displayTime)}</h2>
          <button
            onClick={() => {
              handleReplayClick(
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
            <h1 className="text-3xl font-bold text-white">Replay</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default GameEnd;
