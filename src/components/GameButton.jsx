function GameButton({ label, onClick}) {
  
  const formatLabel = (label) => {
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  return (
    <button className="flex w-[100px] items-center justify-center rounded-[10px] border-4 border-black bg-pokedex-red p-2">
      <h4 onClick={onClick} className="text-center text-2xl font-bold text-white">{formatLabel(label)}</h4>
    </button>
  );
}

export default GameButton;
