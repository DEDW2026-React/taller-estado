import { useState } from 'react'
import artists from '../data/artists.json'

export const titulo = 'Buscador'
export const enunciado = 'Filtra la lista de artistas mientras escribes en el buscador.'

export default function Buscador() {
  // 🎃 1. Crea un estado "query" que parta en '' (texto vacío)

  // 🎃 3. Calcula la lista filtrada. No la guardes en el estado, se calcula en cada render:
  //       artists.filter(artist => artist.name.toLowerCase().includes(query.toLowerCase()))
  const visible = artists

  return (
    <div>
      <input
        placeholder="Buscar artista"
        // 🎃 2. Conecta el input con el estado:
        //       value={query}
        //       onChange={e => setQuery(e.target.value)}
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

      {/* 💯 Extra: si no hay resultados, muestra "No encontramos artistas con ..." */}
    </div>
  )
}
