import { useState, useEffect } from 'react';
import PokemonDisplay from '../assets/components/PokemonDisplay';
import TypeButton from '../assets/components/TypeButton';

function PokeGuesser() {
  const [pokemonName, setPokemonName] = useState(``);
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);
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

  // Generates a random Pokemon ID for a generation one pokemon
  const generateRandomPokemon = () => {
    setPokemonId(Math.floor(Math.random() * 151 + 1));
  };

  // Updates state variables with fetched Pokemon data
  const updatePokemonInfo = (data) => {
    setPokemonName(data.name);
    setPokemonSprite(data.sprites.front_default);
    setPokemonTypes(data.types.map((typeIndex) => typeIndex.type.name));
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

  // Initializes a random pokemon ID when component mounts
  useEffect(() => {
    generateRandomPokemon();
  }, []);

  return (
    <>
      <div className="flex w-full justify-center">
        <PokemonDisplay pokemonName={pokemonName} pokemonSprite={pokemonSprite} pokemonTypes={pokemonTypes} />
      </div>
      <div className="flex w-full justify-center">
        <div className="inline-grid grid-cols-6 justify-center gap-4">
          {allTypes.map((type, index) => (
            <TypeButton
              key={index}
              typeName={type}
              onClick={() => {
                generateRandomPokemon();
                console.log(type);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PokeGuesser;
