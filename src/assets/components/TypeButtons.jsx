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

function TypeButtons({ onClick }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {allPokemonTypes.map((type, index) => (
        <button key={index} onClick={() => onClick(type)}>
          <TypeCard type={type} />
        </button>
      ))}
    </div>
  );
}

export default TypeButtons;
