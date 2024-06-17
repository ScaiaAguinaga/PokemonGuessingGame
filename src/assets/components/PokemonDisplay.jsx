import TypeButton from './TypeButton';

const PokemonDisplay = ({ pokemonName, pokemonSprite, pokemonTypes }) => {
  
  return (
    <>
      <div className="m-auto flex h-[250px] w-[400px] justify-center rounded-[20px] border-4 border-black p-6 align-middle">
        <img src={pokemonSprite}></img>
      </div>
      <h2 className="my-3 text-center text-4xl">{pokemonName}</h2>
      <div className="flex w-full items-center justify-center">
        {pokemonTypes.map((type, index) => (
          <div key={index} className="mx-2">
            <TypeButton typeName={type} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PokemonDisplay;
