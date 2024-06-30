import { useState, useEffect } from 'react';
import PokemonDisplay from '../assets/components/PokemonDisplay';
import TypeButton from '../assets/components/TypeButton';

function PokeGuesser() {
  // Pokemon Info
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonName, setPokemonName] = useState(``);
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [guessCount, setGuessCount] = useState(1);

  const allTypes = [
    'normal',
    'grass',
    'fire',
    'water',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ];

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
    setGuessCount(data.types.map((typeIndex) => typeIndex.type.name).length);
  };

  // Handles comparisons between user guess and Pokemon types
  const handleGuess = (guessType) => {
    let currentGuesses = guessCount;
    // If user selection is correct, decrement counter
    // If user selection is incorrect, call generateRandomPokemon
    if (pokemonTypes.includes(guessType)) {
      console.log(`${pokemonName} is a ${guessType} type!`);
      currentGuesses -= 1;
      setGuessCount(currentGuesses);

      // Remove correctly guessed type from pokemon array so it may not be selected again
      setPokemonTypes(pokemonTypes.filter((pokemonType) => pokemonType !== guessType));

      // If user still has more to guess skip generateRandomPokemon call
      if (currentGuesses > 0) {
        return;
      }
    } else {
      console.log(`${pokemonName} is not a ${guessType} type!`);
    }
    // Generates new pokemon when either all information is correctly guessed or a singular incorrect guess is made.
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
                <PokemonDisplay pokemonName={pokemonName} pokemonSprite={pokemonSprite} pokemonTypes={pokemonTypes} />
                {/* Displays all Pokemon types for user guesses */}
                <div className="flex flex-grow items-end justify-center">
                  <div className="grid max-h-[420px] grid-cols-3 gap-4">
                    {allTypes.map((type, index) => (
                      <TypeButton
                        key={index}
                        typeName={type}
                        onClick={() => {
                          handleGuess(type);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div className="rounded-[20px] bg-pokedex-red p-6">
            <div className="flex h-full w-full flex-col rounded-[20px] bg-cream px-4 py-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeGuesser;
