// Generates a random Pokemon ID that has not been used (currently only gen 1)
export const generateRandomPokemon = (setPokemon, game) => {
  // Ends game if submission is 4 or higher
  // Set length to the amount of pokemon to be guessed
  // Other game completion check is in gameUtils {handleSubmit}
  if (game.pokemonIds.length == 151) {
    console.log('Game Over');
    return;
  }

  let newId;
  do {
    newId = Math.floor(Math.random() * 151 + 1);
  } while (game.pokemonIds.includes(newId));

  setPokemon((currentPokemon) => ({
    ...currentPokemon,
    id: newId,
  }));
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
