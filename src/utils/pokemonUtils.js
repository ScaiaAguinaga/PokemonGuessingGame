// Sets the pokemon ID
export const setPokemonId = (newId, setPokemon) => {
  setPokemon((currentPokemon) => ({
    ...currentPokemon,
    id: newId,
  }));
};

// Updates Pokemon object with newly fetched Pokemon data from PokeAPI
export const updatePokemonInfo = (data, setPokemon) => {
  setPokemon((currentPokemon) => ({
    ...currentPokemon,
    id: data.id,
    name: formatPokemonName(data.name),
    types: data.types.map((typeIndex) => typeIndex.type.name),
    hdSprite: data.sprites.other['official-artwork'].front_default,
    pixelSprite: data.sprites.front_default,
    userTypeResponse: [],
  }));
};

//
export const emptySlot = (setPokemon) => {
  setPokemon({
    id: 0,
    name: '',
    types: [],
    hdSprite: '',
    pixelSprite: '',
    // Used for displaying previous answers
    userTypeResponse: [],
  });
};

// Generates a random Pokemon ID that has not been used
export const generatePokemonId = (game, preloadedIds = [0]) => {
  const { pokemonIds } = game;
  const excludedIds = [...pokemonIds, ...preloadedIds];

  let newId;
  do {
    newId = Math.floor(Math.random() * 151 + 1);
  } while (excludedIds.includes(newId));

  return newId;
};

// Formats name with proper capitalization and spacing for display purposes
export const formatPokemonName = (name) => {
  // If name contains hyphen or space use more complex formatting method
  if (name.includes('-') || name.includes(' ')) {
    // If name contains a hyphen, replace it with space
    if (name.includes('-')) {
      name = name.replace('-', ' ');
    }

    // Records the location of the space in the string
    let spaceLocation = name.indexOf(' ');

    // Formats name so the first letter and the letter after the space are upper case
    name =
      name.charAt(0).toUpperCase() +
      name.slice(1, spaceLocation + 1) +
      name.charAt(spaceLocation + 1).toUpperCase() +
      name.slice(spaceLocation + 2);
  } else {
    // If name is one word just capitalize the first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  return name;
};

// Updates userTypeRespons
export const updateUserTypeResponse = (pokemon, setPokemon, operation, type) => {
  if (operation === 'add') {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      userTypeResponse: [...pokemon.userTypeResponse, type],
    }));
  }
  if (operation == 'remove') {
    setPokemon((currentPokemon) => ({
      ...currentPokemon,
      userTypeResponse: pokemon.userTypeResponse.filter((answerType) => answerType !== type.slice(4)),
    }));
  }
};

// Resets the types selected in the user submission zone
export const handleReset = (setPokemon) => {
  setPokemon((currentPokemon) => ({
    ...currentPokemon,
    userTypeResponse: [],
  }));
};
