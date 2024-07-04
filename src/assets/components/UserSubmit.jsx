import TypeCard from './TypeCard';

function UserSubmit({ userAnswer }) {
  return (
    <>
      <div className="my-6 flex h-[56px] w-full justify-center gap-4">
        {userAnswer.map((type, index) => (
          <TypeCard key={index} type={type} />
        ))}
      </div>
    </>
  );
}

export default UserSubmit;
