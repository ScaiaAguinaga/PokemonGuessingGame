import { useState, useEffect } from 'react';
import PokemonDisplay from '../components/PokemonDisplay';
import UserSubmit from '../components/UserSubmit';
import TypeButtons from '../components/TypeButtons';
import PokemonLog from '../components/PokemonLog.jsx';
import { DndContext } from '@dnd-kit/core';

import { fetchPokemonData } from '../utils/pokeApi';
import { generateRandomPokemon, updateUserTypeResponse } from '../utils/pokemonUtils.js';

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

  const [pokemonLog, setPokemonLog] = useState([]);

  // Will be moved to userSubmit component with submit and reset buttons
  const [clickedSubmit, setClickedSubmit] = useState(false);

  // Initializes a random pokemon ID when component mounts
  useEffect(() => {
    generateRandomPokemon(setPokemon);
  }, []);

  // Fetches Pokemon data from PokeAPI whenever pokemonId changes
  useEffect(() => {
    fetchPokemonData(pokemon.id, setPokemon);
  }, [pokemon.id]);

  // Adds and removes types from user answer on drag end
  const handleDragEnd = (event) => {
    // If dropped in user-submit and from type-buttons add type to useranswer
    if (event.over.id === 'user-submit' && event.active.data.current === 'type-buttons') {
      // Checks if type is already in userAnswer
      if (pokemon.userTypeResponse.length < 2 && !pokemon.userTypeResponse.includes(event.active.id))
        updateUserTypeResponse(pokemon, setPokemon, 'add', event.active.id);
    }
    // If dropped in type-buttons and from user-submit remove type from userAnswer
    if (event.over.id === 'type-buttons' && event.active.data.current === 'user-submit') {
      updateUserTypeResponse(pokemon, setPokemon, 'remove', event.active.id);
    }
  };

  // Allows the user to empty their submission zone
  const handleReset = () => {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      userTypeResponse: [],
    }));
  };

  // Compares user submission to answer
  const handleSubmit = () => {
    if (!clickedSubmit) {
      setClickedSubmit(true);
      setTimeout(() => {
        setClickedSubmit(false);
      }, 750);
      if (
        (pokemon.types[0] == pokemon.userTypeResponse[0] || pokemon.types[0] == pokemon.userTypeResponse[1]) &&
        (pokemon.types[1] == pokemon.userTypeResponse[0] || pokemon.types[1] == pokemon.userTypeResponse[1])
      ) {
        console.log('Correct');
      } else console.log('Incorrect');
      setPokemonLog([...pokemonLog, pokemon]);
      console.log(pokemonLog);
      handleReset();
      generateRandomPokemon(setPokemon);
    }
  };

  return (
    <>
      {/* Styling for pokedex design */}
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="grid h-[1000px] w-[1280px] grid-cols-2 gap-[30px]">
          {/* Left panel */}
          <div className="rounded-[20px] bg-pokedex-red p-6">
            <div className="h-full w-full rounded-[20px] bg-cream px-4 py-6">
              {/* Container for left panel content */}
              <div className="flex h-full w-full flex-col rounded-[20px]">
                <h1 className="mb-6 text-center text-5xl font-bold">POKÉDEX</h1>
                {/* Displays Pokemon image and user input areas*/}
                <PokemonDisplay
                  pokemonName={pokemon.name}
                  pokemonSprite={pokemon.hdSprite}
                  handleReset={handleReset}
                  handleSubmit={handleSubmit}
                />
                {/* Context for draf and dropping between answer zone and choice zone */}
                <DndContext onDragEnd={handleDragEnd}>
                  {/* Droppable zone to submit your guess */}
                  <UserSubmit userAnswer={pokemon.userTypeResponse} />
                  {/* Displays all Pokemon types for user guesses */}
                  <TypeButtons />
                </DndContext>
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div className="rounded-[20px] bg-pokedex-red p-6">
            <div className="flex h-full w-full flex-col rounded-[20px] bg-cream px-4 py-6">
              {/* Container for left panel content */}
              <div className="flex h-full w-full flex-col rounded-[20px]">
                <h1 className="mb-4 text-center text-5xl font-bold">POKÉLOG</h1>
                {/* Displays log of past user answers */}
                <PokemonLog pokeLog={pokemonLog} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeGuesser;
