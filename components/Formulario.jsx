import { useEffect, useState } from "react";

const Api= "https://pokeapi.co/api/v2/pokemon/"

function Formulario()  {
    const [nombrePokemon, setNombrePokemon] = useState("");
    const [resultPokemon, setResultPokemon] = useState({});
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

const buscarPokemon = async (e) =>{
    e.preventDefault();
    alert(`Nombre: ${nombrePokemon}`);
    setCargando(true)
    setError(null)
    try{
        const response = await fetch(`${Api}${nombrePokemon.toLowerCase()}`)
        if(!response.ok) throw new Error("Lo siento, no hemos encontrado este pokemon")

        const data = await response.json()
        console.log(data)
        setResultPokemon(data)
        setCargando(false)

    }catch (err){
        console.error(err)
        setError("Error al buscar tu pokemon")
    }
}

return (
    <>
      <form onSubmit={buscarPokemon}  >
        <label htmlFor="nombre">Nombre del Pokémon </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombrePokemon}
          onChange={(e) => setNombrePokemon(e.target.value)}
        />
        <button type="submit"> Buscar</button>
      </form>

      {cargando && <p>Cargando...</p> }
      {error && <p>{error}</p>}
      {resultPokemon && (
        <div>
          <h2>{resultPokemon.name}</h2>
          <img src={resultPokemon.sprites.front_default} alt={resultPokemon.name} />
        </div>
      )}
    </>
)

}

export default Formulario