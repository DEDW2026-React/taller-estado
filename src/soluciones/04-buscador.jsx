import { useState } from 'react'
import artists from '../data/artists.json'

export default function Buscador() {
  const [query, setQuery] = useState('')

  const visible = artists.filter(artist =>
    artist.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <input
        placeholder="Buscar artista"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <p className="muted">
        Mostrando {visible.length} de {artists.length}
      </p>

      <ul className="list">
        {visible.map(artist => (
          <li key={artist.id}>
            <img src={artist.images[0].uri150} alt={artist.name} />
            {artist.name}
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p>No encontramos artistas con "{query}"</p>}
    </div>
  )
}
