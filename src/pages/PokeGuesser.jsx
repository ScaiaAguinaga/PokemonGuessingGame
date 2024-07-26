// React hooks
import { useRef, useState } from 'react';
// dnd-kit
import { DndContext } from '@dnd-kit/core';
// Components
import PokemonDisplay from '../components/PokemonDisplay';
import UserSubmit from '../components/UserSubmit';
import TypeButtons from '../components/TypeButtons';
import PokemonLog from '../components/PokemonLog';
import GameStats from '../components/GameStats';
// Utilities
import { handleDragEnd } from '../utils/userSubmit';
import { initializeSession } from '../utils/sessionUtils';
// Icons
import { IoBulbOutline } from 'react-icons/io5';
import { setStartTime, updateTimer } from '../utils/gameUtils';

function PokeGuesser() {
  // Log of all pokemon and user submissions
  const [pokemonLog, setPokemonLog] = useState([]);
  // State variable for start screen
  const [paused, setPaused] = useState(true);
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
    hdSprite: '',
    pixelSprite: '',
    // Used for displaying previous answers
    userTypeResponse: [],
  });

  // State for managing next Pokémon data
  const [nextPokemon, setNextPokemon] = useState({
    id: 0,
    name: '',
    types: [],
    hdSprite: '',
    pixelSprite: '',
    // Used for displaying previous answers
    userTypeResponse: [],
  });

  // Handles game start button click
  const handleStartClick = () => {
    // Unpause session
    setPaused(false);

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
    <>
      {/* Start popup window */}
      {paused && (
        <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
          <div className="flex flex-col items-center justify-center gap-y-10 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] p-10 shadow-2xl">
            <h1 className="text-5xl">
              Welcome to <span className="font-bold text-pokedex-red">POKÉGUESSER</span>
            </h1>
            <button
              onClick={handleStartClick}
              className="flex h-[100px] w-[225px] items-center justify-center rounded-[20px] border-4 border-black bg-pokedex-red drop-shadow-xl"
            >
              <h1 className="text-3xl font-bold text-white">Start</h1>
            </button>
          </div>
        </div>
      )}

      {/* Styling for pokedex design */}
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="grid grid-cols-2 gap-[30px]">
          {/* Left panel */}
          <div className="h-[1000px] w-[625px] rounded-[20px] bg-pokedex-red p-6">
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
                    pokemon={pokemon}
                    setPokemon={setPokemon}
                    nextPokemon={nextPokemon}
                    setNextPokemon={setNextPokemon}
                    pokemonLog={pokemonLog}
                    setPokemonLog={setPokemonLog}
                    game={game}
                    setGame={setGame}
                  />
                  {/* Displays all Pokemon types for user guesses */}
                  <TypeButtons />
                </DndContext>
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div className="h-[1000px] w-[625px] rounded-[20px] bg-pokedex-red p-6">
            <div className="flex h-full w-full flex-col rounded-[20px] bg-cream px-4 py-6">
              {/* Container for right panel content */}
              <div className="flex h-full w-full flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="ml-[68px] flex-grow text-center text-5xl font-bold">POKÉLOG</h1>
                  <IoBulbOutline
                    className="ml-4 mr-5 h-12 w-12 cursor-pointer rounded-full bg-pokedex-red p-2 text-white"
                    onClick={() => console.log('Hint pressed')}
                  />
                </div>
                {/* Displays log of past user answers */}
                <PokemonLog pokeLog={pokemonLog} />
                {/* Displays game and user stats */}
                <GameStats game={game} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeGuesser;
