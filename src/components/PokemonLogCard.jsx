// React hooks
import { useEffect, useState } from 'react';
// Components
import TypeIcon from './TypeIcon';

function PokemonLogCard({ pokemon }) {
  const [displayedTypes, setDisplayedTypes] = useState(pokemon.userTypeResponse);
  const [isHovered, setIsHovered] = useState(false);

  // Displays pokemon types when a log card is hovered
  const typesToDisplay = isHovered ? pokemon.types : displayedTypes;

  // Flags for determining if a user submitted fewer types than the currently selected pokemon contains
  const hasInsufficientTypes = displayedTypes.length < pokemon.types.length;

  // Handles mouse enter event for card
  const handleMouseEnter = () => setIsHovered(true);

  // Handles mouse leave event for card
  const handleMouseLeave = () => setIsHovered(false);

  // Aligns userTypeResponse and types when both arrays have matching elements
  // If displayed types has insufficient types, includes proper index to display a question mark
  useEffect(() => {
    if (displayedTypes.length > 1 && pokemon.types.length > 1) {
      if (pokemon.types[0] === displayedTypes[1] || pokemon.types[1] === displayedTypes[0]) {
        setDisplayedTypes([displayedTypes[1], displayedTypes[0]]);
      }
    }

    if (hasInsufficientTypes) {
      setDisplayedTypes((prevTypes) => [...prevTypes, 'insufficient-types']);
    }
  }, [displayedTypes, pokemon.types, hasInsufficientTypes]);

  return (
    <div
      className="flex w-[366px] rounded-[20px] border-4 border-black bg-cream px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={pokemon.pixelSprite} className="h-24 w-24" />
      <div className="flex items-center justify-start text-2xl">{pokemon.name}</div>
      <div className="flex flex-grow items-center justify-end gap-[6px]">
        {/* Displays an  */}
        {hasInsufficientTypes && !isHovered ? <TypeIcon type={'insufficient-types'} isCorrect={false} /> : ''}
        {/* Displays a card for submitted types */}
        {typesToDisplay.map((type, index) => (
          <TypeIcon key={index} type={type} isCorrect={pokemon.types.includes(type) ? true : false} />
        ))}
      </div>
    </div>
  );
}

export default PokemonLogCard;
