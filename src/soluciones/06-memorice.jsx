import { useState } from 'react'

const COLORES = ['#F94144', '#277DA1', '#43AA8B', '#F9C74F', '#9B5DE5', '#F3722C', '#F15BB5', '#90BE6D']

function barajar() {
  return [...COLORES, ...COLORES]
    .toSorted(() => Math.random() - 0.5)
    .map((color, index) => ({ id: index, color }))
}

function Carta({ color, visible, onClick }) {
  return (
    <button
      className="carta"
      style={{ backgroundColor: visible ? color : 'gray' }}
      onClick={onClick}
    />
  )
}

export default function Memorice() {
  const [cartas, setCartas] = useState(barajar)
  const [abiertas, setAbiertas] = useState([])
  const [encontradas, setEncontradas] = useState([])
  const [movimientos, setMovimientos] = useState(0)

  function handleClick(carta) {
    if (abiertas.length === 2) return
    if (abiertas.includes(carta.id) || encontradas.includes(carta.id)) return

    const nuevasAbiertas = [...abiertas, carta.id]
    setAbiertas(nuevasAbiertas)

    if (nuevasAbiertas.length === 1) return

    setMovimientos(movimientos + 1)
    const primera = cartas[nuevasAbiertas[0]]
    const segunda = cartas[nuevasAbiertas[1]]

    if (primera.color === segunda.color) {
      setEncontradas([...encontradas, primera.id, segunda.id])
      setAbiertas([])
    } else {
      setTimeout(() => setAbiertas([]), 1000)
    }
  }

  function jugarDeNuevo() {
    setCartas(barajar())
    setAbiertas([])
    setEncontradas([])
    setMovimientos(0)
  }

  const gano = encontradas.length === cartas.length

  return (
    <div>
      <p>Movimientos: {movimientos}</p>
      <div className="tablero">
        {cartas.map(carta => (
          <Carta
            key={carta.id}
            color={carta.color}
            visible={abiertas.includes(carta.id) || encontradas.includes(carta.id)}
            onClick={() => handleClick(carta)}
          />
        ))}
      </div>
      {gano && <h2>¡Ganaste! 🎉 en {movimientos} movimientos</h2>}
      <p>
        <button onClick={jugarDeNuevo}>Jugar de nuevo</button>
      </p>
    </div>
  )
}
