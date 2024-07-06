import { useState, useEffect } from 'react';
import PokemonDisplay from '../components/PokemonDisplay';
import UserSubmit from '../components/UserSubmit';
import TypeButtons from '../components/TypeButtons';
import { DndContext } from '@dnd-kit/core';

import { fetchPokemonData } from '../utils/pokeApi';
import { generateRandomPokemon, updateUserTypeResponse, formatPokemonName } from '../utils/pokemonUtils';

function PokeGuesser() {
  // Object containing data of a pokemon as well as the user data relevant to it
  const [pokemon, setPokemon] = useState({
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    hdSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    pixelSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    // Used for displaying previous answers
    userTypeResponse: [],
  });

  // Initializes a random pokemon ID when component mounts
  useEffect(() => {
    generateRandomPokemon(setPokemon);
  }, []);

  // Fetches Pokemon data from PokeAPI whenever pokemonId changes
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await fetchPokemonData(pokemon.id);
        updatePokemonInfo(data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemon();
  }, [pokemon.id]);

  // Updates state variables with fetched Pokemon data
  const updatePokemonInfo = (data) => {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      name: formatPokemonName(data.name),
      types: data.types.map((typeIndex) => typeIndex.type.name),
      hdSprite: data.sprites.other['official-artwork'].front_default,
      pixelSprite: data.sprites.front_default,
      userTypeResponse: [],
    }));
  };

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
    if (
      (pokemon.types[0] == pokemon.userTypeResponse[0] || pokemon.types[0] == pokemon.userTypeResponse[1]) &&
      (pokemon.types[1] == pokemon.userTypeResponse[0] || pokemon.types[1] == pokemon.userTypeResponse[1])
    ) {
      console.log('Correct');
    } else console.log('Incorrect');
    handleReset();
    generateRandomPokemon(setPokemon);
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
              {/* Showcase answers for development only */}
              <h1 className="text-xl font-bold">CURRENT POKEMON TYPES</h1>
              <ul>
                {pokemon.types.map((type, index) => (
                  <li className="text-xl" key={index}>
                    {type}
                  </li>
                ))}
              </ul>

              <h1 className="text-xl font-bold">CURRENT USER GUESSES</h1>
              <ul>
                {pokemon.userTypeResponse.map((type, index) => (
                  <li className="text-xl" key={index}>
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeGuesser;
