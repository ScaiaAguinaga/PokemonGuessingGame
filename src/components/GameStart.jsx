function GameStart({ handleStartClick, setShowStart, setShowInstructions }) {
  return (
    <>
      <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
        <div className="flex h-1/3 w-1/3 flex-col items-center justify-center gap-y-10 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] shadow-2xl">
          <h1 className="text-5xl">
            Welcome to <span className="font-bold text-pokedex-red">POKÉGUESSER</span>
          </h1>
          <button
            onClick={handleStartClick}
            className="flex h-[80px] w-[175px] items-center justify-center rounded-[20px] border-4 border-black bg-pokedex-red drop-shadow-xl"
          >
            <h1 className="text-3xl font-bold text-white">Start</h1>
          </button>
          <h1
            onClick={() => {
              setShowStart(false);
              setShowInstructions(true);
            }}
            className="cursor-pointer text-5xl text-pokedex-red underline"
          >
            Learn to play
          </h1>
        </div>
      </div>
    </>
  );
}

export default GameStart;
