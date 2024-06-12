const PokemonDisplay = ({ pokemonName, pokemonSprite, pokemonTypes }) => {
  return (
    <>
      <div className="grid grid-cols-2">
        <img src={pokemonSprite} className="w-32 items-center justify-center"></img>
        <div className="flex flex-col items-center justify-center text-center">
          <h1>{pokemonName}</h1>
          <ul>
            {pokemonTypes.map((pokemonType, index) => (
              <li key={index}>{pokemonType}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PokemonDisplay;
