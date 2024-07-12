import { useEffect, useRef, useState } from 'react';
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
    <div
      ref={scrollRef}
      className={`flex h-[344px] w-full flex-col items-center gap-2 overflow-auto py-2 ${isScrollBarVisible ? `pl-15[px]` : ``}`}
    >
      {pokeLog.map((pokemon, index) => (
        <PokemonLogCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonLog;
