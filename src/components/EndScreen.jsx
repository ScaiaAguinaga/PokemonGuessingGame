function EndScreen({ game }) {
  const endScreenTimeFormat = (timeString) => {
    if (timeString[0] === '0' && timeString[1] === '0') {
      return timeString.slice(3);
    } else return timeString;
  };
  return (
    <>
      <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
        <div className="flex h-1/3 w-1/3 flex-col items-center justify-center gap-y-5 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] shadow-2xl">
          <h1 className="text-5xl font-bold">RUN COMPLETED!</h1>
          <h1 className="text-5xl font-bold text-pokedex-red">Thanks for playing!</h1>
          <h2 className="text-4xl">Score: {game.correctCount}</h2>
          <h2 className="text-4xl">Time: {endScreenTimeFormat(game.displayTime)}</h2>
        </div>
      </div>
    </>
  );
}

export default EndScreen;
