// React hooks
import { useState } from 'react';
// dnd-kit
import { useDroppable } from '@dnd-kit/core';
// Components
import TypeCard from './TypeCard';
// Utilities
import { handleReset, handleSubmit } from '../utils/gameUtils';
// Icons
import { MdCancel, MdCheckCircle } from 'react-icons/md';


function UserSubmit({ userAnswer, pokemon, setPokemon, pokemonLog, setPokemonLog, setGame }) {
  // Will be moved to userSubmit component with submit and reset buttons
  const [clickedSubmit, setClickedSubmit] = useState(false);

  const { setNodeRef } = useDroppable({
    id: 'user-submit',
  });

  return (
    <div className="flex items-center">
      {/* Button for emptying current user answer */}
      <div className="ml-6 flex flex-grow items-end justify-start">
        <MdCancel onClick={() => handleReset(setPokemon)} cursor="pointer" className="h-10 w-10" />
      </div>
      {/* User submission zone for drag and drop */}
      <div
        ref={setNodeRef}
        className="m-auto my-4 flex h-[76px] w-[366px] items-center justify-center gap-4 rounded-[20px] border-4 border-black"
      >
        {/* If no types are selected, directs user's to drag and drop */}
        {userAnswer.length === 0 ? (
          <h1 className="px-2 text-center text-2xl font-bold text-[hsl(38,90%,44%)]">Drag Types Here!</h1>
        ) : null}

        {userAnswer.map((type, index) => (
          <TypeCard key={index} type={type} source="user-submit" />
        ))}
      </div>
      {/* Button for user submit */}
      <div className="mr-6 flex flex-grow items-end justify-end">
        <MdCheckCircle
          onClick={() =>
            handleSubmit(clickedSubmit, setClickedSubmit, pokemon, setPokemon, pokemonLog, setPokemonLog, setGame)
          }
          cursor="pointer"
          className="h-10 w-10"
        />
      </div>
    </div>
  );
}

export default UserSubmit;
