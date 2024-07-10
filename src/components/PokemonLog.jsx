import PokemonLogCard from './PokemonLogCard.jsx';

function PokemonLog({ pokeLog }) {
  return (
    <div>
      <h1 className="text-5xl text-center font-bold">ANSWER LOG</h1>
      <div className="flex h-[344px] w-full flex-col items-center gap-2 overflow-auto py-2">
        {pokeLog.map((pokemon, index) => (
          <PokemonLogCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonLog;
