const PokemonDisplay = ({ pokemonName, pokemonSprite }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Displays pokemon sprite in a rounded border box */}
        <div className="flex h-[250px] w-[366px] justify-center rounded-[20px] border-4 border-black p-4 align-middle">
          <img src={pokemonSprite} className="h-full"></img>
        </div>
        {/* Displays pokemon name */}
        <div className="mt-4 flex w-full justify-center">
          <h2 className="text-center text-4xl">{pokemonName}</h2>
        </div>
      </div>
    </>
  );
};

export default PokemonDisplay;
