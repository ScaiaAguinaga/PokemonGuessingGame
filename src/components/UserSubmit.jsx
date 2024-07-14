import TypeCard from './TypeCard';

import { useDroppable } from '@dnd-kit/core';

function UserSubmit({ userAnswer }) {
  const { setNodeRef } = useDroppable({
    id: 'user-submit',
  });

  return (
    <div>
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
    </div>
  );
}

export default UserSubmit;
