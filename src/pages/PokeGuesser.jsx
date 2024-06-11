import { useState, useEffect } from 'react';

import TypeButton from '../assets/components/TypeButton';

function PokeGuesser() {
  const [pokemonName, setPokemonName] = useState(``);
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

  // FOR TESTING
  const [answerText, setAnswerText] = useState('');
  const [guessCount, setGuessCount] = useState(1);

  // Generates a random pokemon name
  const generateRandomPokemon = async () => {
    // Fetches the names of the first 151 pokemon
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    setPokemonName(data.results[randomIndex].name);
  };

  // Generates the first random pokemon on page render
  useEffect(() => {
    generateRandomPokemon();
  }, []);

  // Updates the pokemon information displayed whenever name is changed
  useEffect(() => {
    // Fetches data from PokeAPI using the user inputted Pokemon name
    const fetchPokemonData = async () => {
      try {
        // Instantly return if pokemonName is empty
        if (!pokemonName) return;

        // Convert pokemonName to lowercase for API request
        const pokemonUrlName = pokemonName.toLocaleLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonUrlName}`);

        // If rejected, throw a "Pokemon not found" error
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }

        // If resolved, parse it into a JavaScript object
        const data = await response.json();
        // Updates displayed pokemon data
        setPokemonName(pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase());
        setPokemonSprite(data.sprites.front_default);
        setPokemonTypes(data.types.map((typeIndex) => typeIndex.type.name));
        setGuessCount(pokemonTypes.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonData();
  }, [pokemonName]);

  const handleTypeClick = (type) => {
    // console.log(pokemonTypes)
    if (type === pokemonTypes[0] || type === pokemonTypes[1]) {
      setAnswerText('Correct');
      setTimeout(() => {
        setAnswerText('');
      }, 1500);
      setGuessCount(guessCount - 1);
      if (guessCount === 1) {
        generateRandomPokemon();
      }
    } else {
      setAnswerText('Incorrect...');
      setTimeout(() => {
        setAnswerText('');
      }, 1500);
      generateRandomPokemon();
    }
  };

  return (
    <>
      <img src={pokemonSprite} alt="Pokemon sprite"></img>

      <h1>Name: {pokemonName}</h1>

      {/* Renders a button for each pokemon type */}
      <div className="inline-grid grid-cols-6 gap-2">
        {allTypes.map((type, index) => (
          <TypeButton key={index} typeName={type} onClick={() => handleTypeClick(type)} />
        ))}
      </div>

      <h1>{answerText}</h1>
    </>
  );
}

export default PokeGuesser;
