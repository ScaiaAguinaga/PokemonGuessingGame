const Home = () => {
  async function fetchData() {
    try {
      const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();

      document.getElementById("pokemonSprite").src=data.sprites.front_default

      console.log(data);
      
    } catch (error) {
      console.error(error);
    }
  }

  // getPokeData();

  return (
    <div className="flex h-screen items-center justify-center">
      <img id="pokemonSprite" src="" className="h-[300px]"/>
      <input type="text" id="pokemonName" className="mx-5 border-2 border-black p-1"></input>
      <button onClick={() => fetchData()} className="border-2 border-black p-1">
        Fetch Pokemon Data
      </button>
    </div>
  );
};

export default Home;
