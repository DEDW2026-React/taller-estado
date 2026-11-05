import { useState } from 'react'

export const titulo = 'Me gusta'
export const enunciado = 'Haz que el botón sume un like cada vez que lo aprietas.'

export default function MeGusta() {
  // 🎃 1. Crea un estado "likes" que parta en 0.
  //       Pista: const [likes, setLikes] = useState(...)

  function handleClick() {
    // 🎃 2. Suma 1 a likes usando setLikes
  }

  return (
    <button className="big" onClick={handleClick}>
      ❤️ 0 {/* 🎃 3. Cambia el 0 por likes */}
    </button>
  )
}
