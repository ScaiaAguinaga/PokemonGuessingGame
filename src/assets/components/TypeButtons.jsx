import TypeCard from './TypeCard';
import { Draggable, Droppable } from 'react-beautiful-dnd';

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

function TypeButtons({ onClick }) {
  return (
    <div>
      <Droppable droppableId="types-grid">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-3 gap-4">
            {allPokemonTypes.map((type, index) => (
              <Draggable key={index} draggableId={type} index={index}>
                {(provided) => (
                  <div
                    onClick={() => onClick(type)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TypeCard type={type} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TypeButtons;
