// Icons
import { MdOutlineQuestionMark } from 'react-icons/md';

function TypeIcon({ type, isCorrect }) {
  const allTypes = [
    { id: 0, name: 'insufficient-types' },
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

  // Sets selectedType to correspond with passed in type argument
  const selectedType = allTypes.find((t) => t.name === type);

  // Modifies classes to display correct or incorrect responses
  const displayValidation = isCorrect ? 'border-4 border-green-500' : 'border-4 border-[#FF0000]';

  return (
    <>
      {selectedType.name === 'insufficient-types' ? (
        <MdOutlineQuestionMark className="flex h-[44px] w-[44px] rounded-full bg-[#FF0000] p-1 text-white" />
      ) : (
        <img
          src={selectedType.path}
          alt={selectedType.name}
          className={`flex h-[44px] w-[44px] items-center rounded-full p-[6px] bg-${selectedType.name} ${displayValidation}`}
        />
      )}
    </>
  );
}

export default TypeIcon;
