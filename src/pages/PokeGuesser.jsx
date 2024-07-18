// React hooks
import { useState } from 'react';
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
// Icons
import { IoBulbOutline } from 'react-icons/io5';

function PokeGuesser() {
  // Object containing data of a pokemon as well as the user data relevant to it
  const [pokemon, setPokemon] = useState({
    id: 1,
    name: '',
    types: [],
    hdSprite: '',
    pixelSprite: '',
    // Used for displaying previous answers
    userTypeResponse: [],
  });

  const [game, setGame] = useState({
    pokemonIds: [],
    submitCount: 0,
    correctCount: 0,
    streak: 0,
    time: '12:34:56',
  });

  // Log of all pokemon and user submissions
  const [pokemonLog, setPokemonLog] = useState([]);

  return (
    <>
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
                <GameStats game={game} setGame={setGame} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeGuesser;
