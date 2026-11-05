import { useState } from 'react'

export default function Agregar() {
  const [artists, setArtists] = useState([
    { id: 1, name: 'Queen' },
    { id: 2, name: 'Metallica' },
  ])
  const [name, setName] = useState('')

  function agregarArtista(nuevoNombre) {
    setArtists([...artists, { id: crypto.randomUUID(), name: nuevoNombre }])
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim() === '') return
    agregarArtista(name)
    setName('')
  }

  function handleRemove(id) {
    setArtists(artists.filter(artist => artist.id !== id))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <input
          placeholder="Nombre del artista"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button>Agregar</button>
        <button type="button" onClick={() => agregarArtista('Adele')}>
          Agregar a Adele
        </button>
      </div>

      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button type="button" onClick={() => handleRemove(artist.id)}>
              Quitar
            </button>
          </li>
        ))}
      </ul>
    </form>
  )
}
