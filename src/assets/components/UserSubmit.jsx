import TypeCard from './TypeCard';

import { useDroppable } from '@dnd-kit/core';

function UserSubmit({ userAnswer }) {
  const { setNodeRef } = useDroppable({
    id: 'user-submit',
  });

  return (
    <div ref={setNodeRef} className="my-6 flex h-[56px] w-full justify-center gap-4">
      {userAnswer.map((type, index) => (
        <TypeCard key={index} type={type} source="submit-zone" />
      ))}
    </div>
  );
}

export default UserSubmit;
