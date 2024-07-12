import { useDraggable } from '@dnd-kit/core';

function TypeCard({ type, source, extraClasses, cardStyle = 'full' }) {
  const allTypes = [
    { id: 1, name: `normal`, path: 'src/images/normal.svg' },
    { id: 2, name: `grass`, path: 'src/images/grass.svg' },
    { id: 3, name: `fire`, path: 'src/images/fire.svg' },
    { id: 4, name: `water`, path: 'src/images/water.svg' },
    { id: 5, name: `electric`, path: 'src/images/electric.svg' },
    { id: 6, name: `ice`, path: 'src/images/ice.svg' },
    { id: 7, name: `fighting`, path: 'src/images/fighting.svg' },
    { id: 8, name: `poison`, path: 'src/images/poison.svg' },
    { id: 9, name: `ground`, path: 'src/images/ground.svg' },
    { id: 10, name: `flying`, path: 'src/images/flying.svg' },
    { id: 11, name: `psychic`, path: 'src/images/psychic.svg' },
    { id: 12, name: `bug`, path: 'src/images/bug.svg' },
    { id: 13, name: `rock`, path: 'src/images/rock.svg' },
    { id: 14, name: `ghost`, path: 'src/images/ghost.svg' },
    { id: 15, name: `dragon`, path: 'src/images/dragon.svg' },
    { id: 16, name: `dark`, path: 'src/images/dark.svg' },
    { id: 17, name: `steel`, path: 'src/images/steel.svg' },
    { id: 18, name: `fairy`, path: 'src/images/fairy.svg' },
  ];

  const selectedType = allTypes.find((t) => t.name === type);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: source === 'user-submit' ? `ans-${type}` : `${type}`,
    data: source === 'user-submit' ? 'user-submit' : 'type-buttons',
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const formatTypeName = (type) => type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      {cardStyle == 'full' ? (
        <div
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          className={`flex h-[56px] w-[165px] items-center rounded-[20px] px-3 py-2 bg-${selectedType.name}`}
        >
          <div className={'flex w-full items-center'}>
            <img src={selectedType.path} alt={selectedType.name} className="h-10 w-10" />
            <h2 className="flex-grow text-center text-2xl font-bold text-white">{formatTypeName(selectedType.name)}</h2>
          </div>
        </div>
      ) : (
        <img
          src={selectedType.path}
          alt={selectedType.name}
          className={`flex h-[40px] w-[40px] items-center rounded-[20px] p-2 bg-${selectedType.name} ${extraClasses}`}
        />
      )}
    </>
  );
}

export default TypeCard;
