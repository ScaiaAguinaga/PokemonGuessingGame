import { useDraggable } from '@dnd-kit/core';

function TypeCard({ type, source }) {
  const allTypes = [
    { id: 1, name: `normal`, path: 'src/assets/images/normal.svg' },
    { id: 2, name: `grass`, path: 'src/assets/images/grass.svg' },
    { id: 3, name: `fire`, path: 'src/assets/images/fire.svg' },
    { id: 4, name: `water`, path: 'src/assets/images/water.svg' },
    { id: 5, name: `electric`, path: 'src/assets/images/electric.svg' },
    { id: 6, name: `ice`, path: 'src/assets/images/ice.svg' },
    { id: 7, name: `fighting`, path: 'src/assets/images/fighting.svg' },
    { id: 8, name: `poison`, path: 'src/assets/images/poison.svg' },
    { id: 9, name: `ground`, path: 'src/assets/images/ground.svg' },
    { id: 10, name: `flying`, path: 'src/assets/images/flying.svg' },
    { id: 11, name: `psychic`, path: 'src/assets/images/psychic.svg' },
    { id: 12, name: `bug`, path: 'src/assets/images/bug.svg' },
    { id: 13, name: `rock`, path: 'src/assets/images/rock.svg' },
    { id: 14, name: `ghost`, path: 'src/assets/images/ghost.svg' },
    { id: 15, name: `dragon`, path: 'src/assets/images/dragon.svg' },
    { id: 16, name: `dark`, path: 'src/assets/images/dark.svg' },
    { id: 17, name: `steel`, path: 'src/assets/images/steel.svg' },
    { id: 18, name: `fairy`, path: 'src/assets/images/fairy.svg' },
  ];

  const formatTypeName = (type) => type.charAt(0).toUpperCase() + type.slice(1);

  const selectedType = allTypes.find((t) => t.name === type);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: source === "submit-zone" ? selectedType.id : `${type}`,
    data: `${type}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex h-[56px] w-[165px] items-center rounded-[20px] px-3 py-2 bg-${selectedType.name}`}
    >
      <div className="flex w-full items-center">
        <img src={selectedType.path} alt={selectedType.name} className="h-10 w-10" />
        <h2 className="flex-grow text-center text-2xl font-bold text-white">{formatTypeName(selectedType.name)}</h2>
      </div>
    </div>
  );
}

export default TypeCard;
