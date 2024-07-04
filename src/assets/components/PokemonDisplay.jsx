import { FaRotate } from 'react-icons/fa6';
import { FaArrowRightToBracket } from 'react-icons/fa6';

const PokemonDisplay = ({ pokemonName, pokemonSprite, handleReset, handleSubmit }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Displays pokemon sprite in a rounded border box */}
        <div className="flex h-[250px] w-[400px] justify-center rounded-[20px] border-4 border-black p-4 align-middle">
          <img src={pokemonSprite} className="h-full"></img>
        </div>
        {/* Displays pokemon name */}
        <div className="mt-4 flex w-full justify-center">
          <div className="ml-6 flex flex-grow items-end justify-start">
            <FaRotate onClick={() => handleReset()} className="h-10 w-10" />
          </div>
          <h2 className="text-center text-4xl">{pokemonName}</h2>
          <div className="mr-6 flex flex-grow items-end justify-end">
            <FaArrowRightToBracket onClick={() => handleSubmit()} className="h-10 w-10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDisplay;
