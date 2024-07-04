import { useState, useEffect } from 'react';
import PokemonDisplay from '../assets/components/PokemonDisplay';
import TypeButtons from '../assets/components/TypeButtons';
import UserSubmit from '../assets/components/UserSubmit';

import { DndContext } from '@dnd-kit/core';

function PokeGuesser() {
  // Pokemon Info
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonName, setPokemonName] = useState(``);
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);

  // User related variables
  const [userAnswer, setUserAnswer] = useState([]);

  // Initializes a random pokemon ID when component mounts
  useEffect(() => {
    generateRandomPokemon();
  }, []);

  // Generates a random Pokemon ID for a generation one pokemon
  const generateRandomPokemon = () => {
    setPokemonId(Math.floor(Math.random() * 151 + 1));
  };

  // Fetches Pokemon data from PokeAPI whenever pokemonId changes
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

        // Throws error if promise is rejected
        if (!response.ok) {
          setPokemonId(1); // Temporary fix for rejected promises
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
  }, [pokemonId]);

  // Updates state variables with fetched Pokemon data
  const updatePokemonInfo = (data) => {
    setPokemonName(data.name.charAt(0).toUpperCase() + data.name.slice(1));
    setPokemonSprite(data.sprites.other['official-artwork'].front_default);
    setPokemonTypes(data.types.map((typeIndex) => typeIndex.type.name));
  };

  // Adds and removes types from user answer on drag end
  const handleDragEnd = (event) => {
    // console.log(event);
    // If user drops pokemon typing in answer zone appen that type to their answer
    if (event.over.id === 'user-submit' && userAnswer.length < 2 && !userAnswer.includes(event.active.data.current)) {
      setUserAnswer((userAnswer) => [...userAnswer, event.active.data.current]);
    }
    // If user drops pokemon typing in type buttons zone remove type from their answer
    if (event.over.id === 'type-buttons') {
      setUserAnswer(userAnswer.filter((answerType) => answerType !== event.active.data.current));
    }
  };

  const handleTypeButtonClick = (type) => {
    if (userAnswer.includes(type)) {
      console.log('Already includes');
    } else {
      setUserAnswer((userAnswer) => [...userAnswer, type]);
    }
  };

  // Allows the user the convinience of emptying their answer zone easily
  const handleReset = () => {
    setUserAnswer([]);
  };

  // Compares user submission to answer
  const handleSubmit = () => {
    if (
      (pokemonTypes[0] == userAnswer[0] || pokemonTypes[0] == userAnswer[1]) &&
      (pokemonTypes[1] == userAnswer[0] || pokemonTypes[1] == userAnswer[1])
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
                  pokemonName={pokemonName}
                  pokemonSprite={pokemonSprite}
                  handleReset={handleReset}
                  handleSubmit={handleSubmit}
                />
                {/* Context for draf and dropping between answer zone and choice zone */}
                <DndContext onDragEnd={handleDragEnd}>
                  {/* Droppable zone to submit your guess */}
                  <UserSubmit userAnswer={userAnswer} />
                  {/* Displays all Pokemon types for user guesses */}
                  <TypeButtons onClick={handleTypeButtonClick} />
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
                {pokemonTypes.map((type, index) => (
                  <li className="text-xl" key={index}>
                    {type}
                  </li>
                ))}
              </ul>

              <h1 className="text-xl font-bold">CURRENT USER GUESSES</h1>
              <ul>
                {userAnswer.map((type, index) => (
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
