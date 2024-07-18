const PokemonDisplay = ({ pokemonName, pokemonSprite }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Pokemon Sprite Display */}
      <div className="flex h-[250px] w-[366px] justify-center rounded-[20px] border-4 border-black p-4 align-middle">
        {/* Conditional rendering for Pokemon sprite */}
        {pokemonSprite ? (
          <img src={pokemonSprite} alt={`${pokemonName} sprite`} className="h-full" />
        ) : (
          <div className="flex h-full items-center justify-center">
            {/* Placeholder if no sprite available */}
            <p>Image Loading</p>
          </div>
        )}
      </div>

      {/* Pokemon Name Display */}
      <div className="mt-4 flex w-full justify-center">
        <h2 className="text-center text-4xl">
          {/* Conditional rendering for Pokemon name */}
          {pokemonName || 'Pokémon Loading'}
        </h2>
      </div>
    </div>
  );
};

export default PokemonDisplay;
