// Generates a random Pokemon ID (currently only gen 1)
export const generateRandomPokemon = (setPokemon) => {
  setPokemon((currentPokemon) => ({
    ...currentPokemon,
    id: generateRandomPokemonId(currentPokemon.id),
  }));
};

// Generates a random pokemon ID in generation 1
const generateRandomPokemonId = (currentId) => {
  let newId;

  // Guarantees to not give the same pokemon twice in a row
  do {
    newId = Math.floor(Math.random() * 151 + 1);
  } while (currentId == newId);

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
