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

function TypeButton({ typeName }) {
  function logType() {
    console.log(typeName);
  }

  return (
    <>
      <button onClick={logType} className={`h-28 w-28 rounded-[20px] p-4 bg-${typeName}`}>
        <img src={imagePaths[typeName]} alt={typeName} className="fill-current text-black"></img>
      </button>
    </>
  );
}

export default TypeButton;
