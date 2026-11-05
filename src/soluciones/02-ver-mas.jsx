import { useState } from 'react'
import artists from '../data/artists.json'

const artist = artists[0]

export default function VerMas() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="card">
      <img src={artist.images[0].uri150} alt={artist.name} />
      <h3>{artist.name}</h3>

      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Ver menos' : 'Ver más'}
      </button>

      {isOpen && <p>{artist.profile}</p>}
    </article>
  )
}
