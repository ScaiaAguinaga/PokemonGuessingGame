const PokemonDisplay = ({ pokemonName, pokemonSprite }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Displays pokemon sprite in a rounded border box */}
        <div className="flex h-[250px] w-[400px] justify-center rounded-[20px] border-4 border-black p-4 align-middle">
          <img src={pokemonSprite} className="h-full"></img>
        </div>
        {/* Displays pokemon name */}
        <h2 className="mt-4 text-center text-4xl">{pokemonName}</h2>
      </div>
    </>
  );
};

export default PokemonDisplay;
