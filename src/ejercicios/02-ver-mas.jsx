import { useState } from 'react'
import artists from '../data/artists.json'

export const titulo = 'Ver más / Ver menos'
export const enunciado = 'Muestra la biografía solo cuando aprietas "Ver más". El botón cambia a "Ver menos".'

const artist = artists[0]

export default function VerMas() {
  // 🎃 1. Crea un estado booleano "isOpen" que parta en false

  return (
    <article className="card">
      <img src={artist.images[0].uri150} alt={artist.name} />
      <h3>{artist.name}</h3>

      <button
        onClick={() => {
          // 🎃 2. Cambia isOpen a lo contrario: setIsOpen(!isOpen)
        }}
      >
        Ver más {/* 🎃 3. Si isOpen es true, muestra "Ver menos" (usa un ternario) */}
      </button>

      {/* 🎃 4. Muestra la biografía solo si isOpen es true:
          {isOpen && <p>{artist.profile}</p>} */}
    </article>
  )
}
