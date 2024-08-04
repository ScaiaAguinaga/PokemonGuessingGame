function GameInstructions({ handleStartClick }) {
  return (
    <>
      <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
        <div className="flex h-1/3 w-1/3 flex-col items-center justify-center gap-y-5 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] shadow-2xl">
          <h1 className="text-5xl font-bold text-pokedex-red">Instructions</h1>
          <p className="max-w-[550px] text-center text-3xl">
            In <span className="font-bold">POKÉGUESSER</span>, you have to guess the types of the displayed pokemon.
            <br />
            Drag your guess into the drop zone and hit submit!
          </p>
          <button
            onClick={handleStartClick}
            className="flex h-[80px] w-[175px] items-center justify-center rounded-[20px] border-4 border-black bg-pokedex-red drop-shadow-xl"
          >
            <h1 className="text-3xl font-bold text-white">Start</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default GameInstructions;
