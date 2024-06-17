import TypeButton from './TypeButton';

const PokemonDisplay = ({ pokemonName, pokemonSprite, pokemonTypes, pokemonData }) => {
  return (
    <>
      <div className="flex h-[250px] w-[400px] justify-center rounded-[20px] border-4 border-black p-6 align-middle">
        <img src={pokemonSprite} className="h-full"></img>
      </div>
      <h2 className="my-5 flex justify-center text-center text-4xl">{pokemonName}</h2>
      <div className="mb-5 flex w-full items-center justify-center">
        {pokemonTypes.map((type, index) => (
          <div key={index} className="mx-2">
            <TypeButton typeName={type} cursorType="cursor-default" />
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-4 gap-4">
        <div className="col-span-4 flex items-center justify-center rounded-[20px] border-4 border-black p-2 text-3xl">
          <span className="font-bold">Abilities:</span>{' '}
          {pokemonData === null
            ? 'Loading...'
            : pokemonData.abilities.map((abilityIndex) => abilityIndex.ability.name).join(`, `)}
        </div>
        <div className="col-span-2 flex items-center justify-center rounded-[20px] border-4 border-black p-2 text-3xl">
          <span className="font-bold">Ht: </span> {pokemonData === null ? 'Loading...' : pokemonData.height}
        </div>
        <div className="col-span-2 flex items-center justify-center rounded-[20px] border-4 border-black p-2 text-3xl">
          <span className="font-bold">Wt:</span> {pokemonData === null ? 'Loading...' : pokemonData.weight}
        </div>
        <div className="col-span-3 flex items-center justify-center rounded-[20px] border-4 border-black"></div>
      </div>
    </>
  );
};

export default PokemonDisplay;
