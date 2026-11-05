import { useState } from 'react'

export const titulo = 'Agregar artista'
export const enunciado = 'Agrega artistas a la lista con el formulario o con el botón "Agregar a Adele". La lista está en el estado.'

export default function Agregar() {
  const [artists, setArtists] = useState([
    { id: 1, name: 'Queen' },
    { id: 2, name: 'Metallica' },
  ])

  // 🎃 1. Crea un estado "name" para el input, que parta en ''

  function agregarArtista(nuevoNombre) {
    // 🎃 2. Agrega el artista con spread (no uses push):
    //       setArtists([...artists, { id: crypto.randomUUID(), name: nuevoNombre }])
  }

  function handleSubmit(e) {
    // 🎃 3. Evita que la página se recargue: e.preventDefault()
    // 🎃 4. Agrega lo que se escribió: agregarArtista(name)
    // 🎃 5. Limpia el input: setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <input
          placeholder="Nombre del artista"
          // 🎃 Conecta el input: value={name} y onChange={e => setName(e.target.value)}
        />
        <button>Agregar</button>
        <button type="button" onClick={() => agregarArtista('Adele')}>
          Agregar a Adele
        </button>
      </div>

      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>

      {/* 💯 Extra 1: no agregues el artista si el nombre está vacío.
          💯 Extra 2: un botón "Quitar" en cada artista, usando filter.
          Ojo: dentro de un form, ese botón necesita type="button". */}
    </form>
  )
}
