// React hooks
import { useRef, useState } from 'react';
// dnd-kit
import { DndContext } from '@dnd-kit/core';
// Components
import GameStart from '../components/GameStart';
import GamePause from '../components/GamePause';
import GameEnd from '../components/GameEnd';
import PokemonDisplay from '../components/PokemonDisplay';
import UserSubmit from '../components/UserSubmit';
import TypeButtons from '../components/TypeButtons';
import PokemonLog from '../components/PokemonLog';
import GameStats from '../components/GameStats';
// Utilities
import { handleDragEnd } from '../utils/userSubmit';
import { initializeSession, resumeSession } from '../utils/sessionUtils';
import { setStartTime, updateTimer } from '../utils/gameUtils';
// Icons
import GameInstructions from '../components/GameInstructions';

function PokeGuesser() {
  // Log of all pokemon and user submissions
  const [pokemonLog, setPokemonLog] = useState([]);
  // State variable for start displaying screen
  const [showStart, setShowStart] = useState(true);
  // State variable for displaying instructions
  const [showInstructions, setShowInstructions] = useState(false);
  // State variable for pause displaying screen
  const [showPaused, setShowPaused] = useState(false);
  // State variable for game end
  const [showGameOver, setShowGameOver] = useState(false);
  // Ref to store interval ID
  const timerRef = useRef(null);

  // State for managing game-related data
  const [game, setGame] = useState({
    pokemonIds: [],
    submitCount: 0,
    correctCount: 0,
    streak: 0,
    startTime: 0,
    currentTime: 0,
    elapsedTime: 0,
    displayTime: '00:00:00',
  });

  // State for managing current Pokémon data
  const [pokemon, setPokemon] = useState({
    id: 0,
    name: '',
    types: [],
    hdSprite: '/src/images/Pokeball-icon.png',
    pixelSprite: '',
    // Used for displaying previous answers
    userTypeResponse: [],
  });

  // State for managing next Pokémon data
  const [nextPokemon, setNextPokemon] = useState({
    id: 0,
    name: '',
    types: [],
    hdSprite: '/src/images/Pokeball-icon.png',
    pixelSprite: '',
    // Used for displaying previous answers
    userTypeResponse: [],
  });

  // Handles game start button click
  const handleStartClick = () => {
    // Remove start popup
    setShowStart(false);
    // Remove instructions popup
    setShowInstructions(false);

    // Preload the first two pokemon of the session
    initializeSession(setPokemon, setNextPokemon, game);

    // Set start point for timer
    setStartTime(Date.now(), setGame);

    // Set up interval to update the timer
    timerRef.current = setInterval(() => {
      updateTimer(setGame);
    }, 10); // Update every 10ms
  };

  return (
    <div className="bg-site-bg bg-cover bg-center">
      {/* Start popup window */}
      {showStart && (
        <GameStart
          handleStartClick={handleStartClick}
          setShowStart={setShowStart}
          setShowInstructions={setShowInstructions}
        />
      )}

      {/* Instructions popup window */}
      {showInstructions && <GameInstructions handleStartClick={handleStartClick} />}

      {/* Pause popup window */}
      {showPaused && (
        <GamePause
          onClick={() => resumeSession(timerRef, game, setGame, setShowPaused, setStartTime)}
          timerRef={timerRef}
          setShowPaused={setShowPaused}
          setShowStart={setShowStart}
          setShowGameOver={setShowGameOver}
          setPokemon={setPokemon}
          setNextPokemon={setNextPokemon}
          setPokemonLog={setPokemonLog}
          setGame={setGame}
        />
      )}

      {/* Game Over popup window */}
      {showGameOver && (
        <GameEnd
          game={game}
          timerRef={timerRef}
          setShowPaused={setShowPaused}
          setShowStart={setShowStart}
          setShowGameOver={setShowGameOver}
          setPokemon={setPokemon}
          setNextPokemon={setNextPokemon}
          setPokemonLog={setPokemonLog}
          setGame={setGame}
        />
      )}

      {/* Styling for pokedex design */}
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="grid grid-cols-2 gap-[30px]">
          {/* Left panel */}
          <div className="h-[1000px] w-[625px] rounded-[20px] bg-pokedex-red p-6 shadow-2xl outline outline-4 outline-black">
            <div className="h-full w-full rounded-[20px] bg-cream px-4 py-6">
              {/* Container for left panel content */}
              <div className="flex h-full w-full flex-col">
                <h1 className="mb-6 text-center text-5xl font-bold">POKÉGUESSER</h1>

                {/* Displays Pokemon image and user input areas*/}
                <PokemonDisplay pokemonName={pokemon.name} pokemonSprite={pokemon.hdSprite} />
                {/* Context for draf and dropping between answer zone and choice zone */}
                <DndContext onDragEnd={(event) => handleDragEnd(event, pokemon, setPokemon)}>
                  {/* Droppable zone to clear or submit your guess */}
                  <UserSubmit
                    timerRef={timerRef}
                    pokemon={pokemon}
                    setPokemon={setPokemon}
                    nextPokemon={nextPokemon}
                    setNextPokemon={setNextPokemon}
                    pokemonLog={pokemonLog}
                    setPokemonLog={setPokemonLog}
                    game={game}
                    setGame={setGame}
                    setShowGameOver={setShowGameOver}
                  />
                  {/* Displays all Pokemon types for user guesses */}
                  <TypeButtons />
                </DndContext>
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div className="h-[1000px] w-[625px] rounded-[20px] bg-pokedex-red p-6 shadow-2xl outline outline-4 outline-black">
            <div className="flex h-full w-full flex-col rounded-[20px] bg-cream px-4 py-6">
              {/* Container for right panel content */}
              <div className="flex h-full w-full flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="flex-grow text-center text-5xl font-bold">POKÉLOG</h1>
                </div>
                {/* Displays log of past user answers */}
                <PokemonLog pokeLog={pokemonLog} />
                {/* Displays game and user stats */}
                <GameStats
                  game={game}
                  timerRef={timerRef}
                  setShowPaused={setShowPaused}
                  setShowStart={setShowStart}
                  setShowGameOver={setShowGameOver}
                  setPokemon={setPokemon}
                  setNextPokemon={setNextPokemon}
                  setPokemonLog={setPokemonLog}
                  setGame={setGame}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeGuesser;
