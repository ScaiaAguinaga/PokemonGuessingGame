function PauseScreen({ onClick }) {
  return (
    <>
      <div className="absolute flex h-screen w-screen items-center justify-center bg-[rgb(255,255,255)]/[.75]">
        <div className="flex flex-col items-center justify-center gap-y-10 rounded-[20px] border-4 border-black bg-[rgb(252,232,198)]/[1] p-10 shadow-2xl">
          <h1 className="text-5xl">PAUSED</h1>
          <button onClick={onClick}>RESUME</button>
        </div>
      </div>
    </>
  );
}

export default PauseScreen;
