import TypeCard from './TypeCard';

function pokemonLogCard({ pokemon }) {
  return (
    <div className="h-18 mx-10 flex rounded-[20px] border-4 border-black px-4">
      <img src={pokemon.pixelSprite} className="h-full" />
      <div className="flex items-center justify-start px-2 text-2xl">{pokemon.name}</div>
      <div className="flex flex-grow items-center justify-end gap-4">
        {pokemon.types.map((type, index) => (
          <TypeCard key={index} type={type} cardStyle="icon-only" />
        ))}
      </div>
    </div>
  );
}

export default pokemonLogCard;
