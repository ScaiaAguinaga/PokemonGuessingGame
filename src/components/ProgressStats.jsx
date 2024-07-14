import GameButton from './GameButton';

function ProgressStats({ game }) {
  return (
    <div className="my-3 grid grid-cols-2 gap-y-5 text-center">
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
          <span className="font-bold">TIME:</span> {game.time}
        </h2>
      </div>
      {/* Buttons for user to pause or reset their session */}
      <div className="col-span-2 mt-12 flex items-end justify-center gap-10">
        <GameButton label={'pause'} onClick={() => console.log('Game Paused')} />
        <GameButton label={'Reset'} onClick={() => console.log('Game Reset')} />
      </div>
    </div>
    // <div className="flex flex-col text-center">
    //   <div className="mt-3 grid grid-cols-2 gap-y-5">
    //     {/* Progress on current session */}
    // <div className="col-span-2">
    //   <h1 className="mb-3 text-5xl font-bold">Progress</h1>
    //   <h2 className="text-4xl">{game.submitCount} / 151</h2>
    // </div>
    //     {/* Player score */}
    // <div>
    //   <h2 className="text-4xl font-bold">Score</h2>
    //   <h3 className="text-3xl">{game.correctCount}</h3>
    // </div>
    // {/* Player streak of correct answers */}
    // <div>
    //   <h2 className="text-4xl font-bold">Streak</h2>
    //   <h3 className="text-3xl">{game.streak}</h3>
    // </div>
    // {/*  */}
    // <div className="col-span-2">
    //   <h2 className="text-4xl">
    //     <span className="font-bold">TIME:</span> {game.time}
    //   </h2>
    // </div>
    //   </div>
    // <div className="mt-20 flex items-end justify-center gap-4">
    //   <GameButton label={'pause'} onClick={() => console.log('Game Paused')} />
    //   <GameButton label={'Reset'} onClick={() => console.log('Game Reset')} />
    // </div>
    // </div>
  );
}

export default ProgressStats;
