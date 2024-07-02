const types = [
  { id: `normal`, path: 'src/assets/images/normal.svg' },
  { id: `grass`, path: 'src/assets/images/grass.svg' },
  { id: `fire`, path: 'src/assets/images/fire.svg' },
  { id: `water`, path: 'src/assets/images/water.svg' },
  { id: `electric`, path: 'src/assets/images/electric.svg' },
  { id: `ice`, path: 'src/assets/images/ice.svg' },
  { id: `fighting`, path: 'src/assets/images/fighting.svg' },
  { id: `poison`, path: 'src/assets/images/poison.svg' },
  { id: `ground`, path: 'src/assets/images/ground.svg' },
  { id: `flying`, path: 'src/assets/images/flying.svg' },
  { id: `psychic`, path: 'src/assets/images/psychic.svg' },
  { id: `bug`, path: 'src/assets/images/bug.svg' },
  { id: `rock`, path: 'src/assets/images/rock.svg' },
  { id: `ghost`, path: 'src/assets/images/ghost.svg' },
  { id: `dragon`, path: 'src/assets/images/dragon.svg' },
  { id: `dark`, path: 'src/assets/images/dark.svg' },
  { id: `steel`, path: 'src/assets/images/steel.svg' },
  { id: `fairy`, path: 'src/assets/images/fairy.svg' },
];

function TypeButton({ onClick }) {
  const formatTypeName = (type) => type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="grid grid-cols-3 gap-4">
      {types.map(({ id, path }) => (
        <button
          key={id}
          onClick={() => onClick(id)}
          className={`flex h-[56px] w-[165px] items-center rounded-[20px] px-3 py-2 bg-${id}`}
        >
          <div className="flex w-full items-center">
            <img src={path} alt={id} className="h-10 w-10" />
            <h2 className="flex-grow text-center text-2xl font-bold text-white">{formatTypeName(id)}</h2>
          </div>
        </button>
      ))}
    </div>
  );
}

export default TypeButton;
