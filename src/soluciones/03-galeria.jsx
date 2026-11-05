import { useState } from 'react'
import artists from '../data/artists.json'

export default function Galeria() {
  const [index, setIndex] = useState(0)

  const artist = artists[index]

  return (
    <article className="card">
      <img src={artist.images[0].uri150} alt={artist.name} />
      <h3>{artist.name}</h3>
      <p className="muted">
        {index + 1} de {artists.length}
      </p>

      <div className="row">
        <button onClick={() => setIndex(index - 1)} disabled={index === 0}>
          ⬅️ Anterior
        </button>
        <button onClick={() => setIndex(index + 1)} disabled={index === artists.length - 1}>
          Siguiente ➡️
        </button>
      </div>
    </article>
  )
}
