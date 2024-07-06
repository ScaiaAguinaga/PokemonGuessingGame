import { useState, useEffect } from 'react';
import PokemonDisplay from '../assets/components/PokemonDisplay';
import TypeButtons from '../assets/components/TypeButtons';
import UserSubmit from '../assets/components/UserSubmit';

import { DndContext } from '@dnd-kit/core';

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

  // Initializes a random pokemon ID when component mounts
  useEffect(() => {
    generateRandomPokemon();
  }, []);

  // Generates a random Pokemon ID for a generation one pokemon
  const generateRandomPokemon = () => {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      id: Math.floor(Math.random() * 151 + 1),
    }));
  };

  // Fetches Pokemon data from PokeAPI whenever pokemonId changes
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);

        // Throws error if promise is rejected
        if (!response.ok) {
          setPokemon((currentPokemon) => ({
            ...currentPokemon,
            id: 1, // Temporary fix for rejected promises
          }));
          throw new Error('Pokemon not found');
        }

        // Parses fetched data into a json object and calls update function
        const data = await response.json();
        updatePokemonInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, [pokemon.id]);

  // Updates state variables with fetched Pokemon data
  const updatePokemonInfo = (data) => {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      types: data.types.map((typeIndex) => typeIndex.type.name),
      hdSprite: data.sprites.other['official-artwork'].front_default,
      pixelSprite: '',
      userTypeResponse: [],
    }));
  };

  // Adds and removes types from user answer on drag end
  const handleDragEnd = (event) => {
    // If dropped in user-submit and from type-buttons add type to useranswer
    if (event.over.id === 'user-submit' && event.active.data.current === 'type-buttons') {
      // Checks if type is already in userAnswer
      if (pokemon.userTypeResponse.length < 2 && !pokemon.userTypeResponse.includes(event.active.id))
        setPokemon((currentPokemon) => ({
          ...currentPokemon,
          userTypeResponse: [...pokemon.userTypeResponse, event.active.id],
        }));
    }
    // If dropped in type-buttons and from user-submit remove type from userAnswer
    if (event.over.id === 'type-buttons' && event.active.data.current === 'user-submit') {
      setPokemon((currentPokemon) => ({
        ...currentPokemon,
        userTypeResponse: pokemon.userTypeResponse.filter((answerType) => answerType !== event.active.id.slice(4)),
      }));
    }
  };

  // Allows the user the convinience of emptying their answer zone easily
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
    generateRandomPokemon();
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
