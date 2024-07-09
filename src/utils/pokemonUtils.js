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

// Generates a random Pokemon ID (currently only gen 1)
export const generateRandomPokemon = (setPokemon) => {
  setPokemon((currentPokemon) => ({
    ...currentPokemon,
    id: generateRandomPokemonId(currentPokemon.id),
  }));
};

const generateRandomPokemonId = (currentId) => {
  let newId;
  do {
    newId = Math.floor(Math.random() * 1025 + 1);
  } while (currentId == newId);
  return newId;
};

// Capitalizes first letter of pokemon name for display
export const formatPokemonName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
  // Future addition to format some of the more unusual names like nidoran-f
};
