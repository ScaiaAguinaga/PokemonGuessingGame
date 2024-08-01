function StartScreen({ onClick }) {
  return (
    <>
      <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
        <div className="flex flex-col items-center justify-center gap-y-10 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] p-10 shadow-2xl">
          <h1 className="text-5xl">
            Welcome to <span className="font-bold text-pokedex-red">POKÉGUESSER</span>
          </h1>
          <button
            onClick={onClick}
            className="flex h-[100px] w-[225px] items-center justify-center rounded-[20px] border-4 border-black bg-pokedex-red drop-shadow-xl"
          >
            <h1 className="text-3xl font-bold text-white">Start</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default StartScreen;
