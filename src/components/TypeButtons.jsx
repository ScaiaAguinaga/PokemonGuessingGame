import { useDroppable } from '@dnd-kit/core';
import TypeCard from './TypeCard';

const allPokemonTypes = [
  'normal',
  'grass',
  'fire',
  'water',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

function TypeButtons() {
  const { setNodeRef } = useDroppable({
    id: 'type-buttons',
  });

  return (
    <div ref={setNodeRef} className="grid grid-cols-3 gap-4">
      {allPokemonTypes.map((type, index) => (
        <TypeCard key={index} type={type} source="type-buttons" />
      ))}
    </div>
  );
}

export default TypeButtons;
