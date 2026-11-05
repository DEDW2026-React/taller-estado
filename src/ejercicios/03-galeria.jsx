import { useState } from 'react'
import artists from '../data/artists.json'

export const titulo = 'Anterior / Siguiente'
export const enunciado = 'Recorre los 12 artistas con los botones "Anterior" y "Siguiente".'

export default function Galeria() {
  // 🎃 1. Crea un estado "index" que parta en 0

  const artist = artists[0] // 🎃 2. Cambia el 0 por index

  return (
    <article className="card">
      <img src={artist.images[0].uri150} alt={artist.name} />
      <h3>{artist.name}</h3>
      <p className="muted">
        1 de {artists.length} {/* 🎃 3. Cambia el 1 por index + 1 */}
      </p>

      <div className="row">
        <button
          onClick={() => {
            // 🎃 4. Resta 1 a index
          }}
        >
          ⬅️ Anterior
        </button>
        <button
          onClick={() => {
            // 🎃 5. Suma 1 a index
          }}
        >
          Siguiente ➡️
        </button>
      </div>

      {/* 💯 Extra: ¿qué pasa si aprietas "Anterior" en el primero?
          Deshabilita los botones en los extremos con disabled={...} */}
    </article>
  )
}
