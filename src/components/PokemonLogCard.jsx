import TypeCard from './TypeCard';

function pokemonLogCard({ pokemon }) {
  return (
    <div className="flex w-[366px] rounded-[20px] border-4 border-black px-4">
      <img src={pokemon.pixelSprite} className="h-24 w-24" />
      <div className="flex items-center justify-start pl-2 text-2xl">{pokemon.name}</div>
      <div className="flex flex-grow items-center justify-end gap-2">
        {pokemon.types.map((type, index) => (
          <TypeCard
            key={index}
            type={type}
            cardStyle="icon-only"
            extraClasses={pokemon.userTypeResponse.includes(type) ? '' : 'border-4 border-[#FF0000]'}
          />
        ))}
      </div>
    </div>
  );
}

export default pokemonLogCard;
