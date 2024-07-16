// React hooks
import { useEffect, useRef, useState } from 'react';
// Components
import PokemonLogCard from './PokemonLogCard.jsx';

function PokemonLog({ pokeLog }) {
  const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);
  const scrollRef = useRef(null);

  // Logic for handling scroll functionality
  useEffect(() => {
    // Scrolls to the bottom when pokeLog is updated
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }

    // Logic for keeping PokeLog centered when scrollbar appears
    const hasScrollbar = scrollRef.current.scrollHeight > scrollRef.current.clientHeight;
    setIsScrollBarVisible(hasScrollbar);
  }, [pokeLog]);

  return (
    <div className="bg-pokeball mx-auto flex w-[500px] justify-center rounded-[20px] border-4 border-black bg-cover bg-center py-[30px]">
      <div
        ref={scrollRef}
        className={`flex h-[344px] w-[420px] flex-col items-center gap-2 overflow-auto py-2 ${isScrollBarVisible ? `pl-37[px]` : ``}`}
      >
        {pokeLog.map((pokemon, index) => (
          <PokemonLogCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonLog;
