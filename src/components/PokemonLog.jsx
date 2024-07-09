import { useEffect, useState } from 'react';
import PokemonLogCard from './PokemonLogCard.jsx';

function PokemonLog({ pokeLog }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(pokeLog.length - 1);
  }, [pokeLog]);

  return (
    <div>
      <h1 className="text-xl font-bold">ANSWER LOG</h1>
      <div className="flex flex-col gap-2">
        {pokeLog.map((pokemon, index) => (
          <PokemonLogCard key={index} pokemon={pokemon} />
        ))}
      </div>

      <button className="mr-4 bg-blue-500" onClick={() => (count == 0 ? setCount(0) : setCount(count - 1))}>
        UP
      </button>

      <button
        className="bg-red-500"
        onClick={() => (count == pokeLog.length - 1 ? setCount(pokeLog.length - 1) : setCount(count + 1))}
      >
        DOWN
      </button>
      <div>
        Length: {pokeLog.length} Count: {count}
      </div>
    </div>
  );
}

export default PokemonLog;
