// Image imports
import bug from '../images/bug.svg';
import dark from '../images/dark.svg';
import dragon from '../images/dragon.svg';
import electric from '../images/electric.svg';
import fairy from '../images/fairy.svg';
import fighting from '../images/fighting.svg';
import fire from '../images/fire.svg';
import flying from '../images/flying.svg';
import ghost from '../images/ghost.svg';
import grass from '../images/grass.svg';
import ground from '../images/ground.svg';
import ice from '../images/ice.svg';
import normal from '../images/normal.svg';
import poison from '../images/poison.svg';
import psychic from '../images/psychic.svg';
import rock from '../images/rock.svg';
import steel from '../images/steel.svg';
import water from '../images/water.svg';

const imagePaths = {
  bug: bug,
  dark: dark,
  dragon: dragon,
  electric: electric,
  fairy: fairy,
  fighting: fighting,
  fire: fire,
  flying: flying,
  ghost: ghost,
  grass: grass,
  ground: ground,
  ice: ice,
  normal: normal,
  poison: poison,
  psychic: psychic,
  rock: rock,
  steel: steel,
  water: water,
};

const allTypes = [
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

function TypeButton({ onClick }) {
  const formatTypeName = (type) => type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="grid grid-cols-3 gap-4">
      {allTypes.map((type, index) => (
        <button
          key={index}
          onClick={() => onClick(type)}
          className={`flex h-[56px] w-[165px] items-center rounded-[20px] px-3 py-2 bg-${type}`}
        >
          <div className="flex w-full items-center">
            <img src={imagePaths[type]} alt={type} className="h-10 w-10" />
            <h2 className="flex-grow text-center text-2xl font-bold text-white">{formatTypeName(type)}</h2>
          </div>
        </button>
      ))}
    </div>
  );
}

export default TypeButton;
