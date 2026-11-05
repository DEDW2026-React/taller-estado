import { useState } from 'react'

export const titulo = 'Desafío: memorice'
export const enunciado =
  'Arma un memorice completo. Esta vez no hay pasos: tú decides qué estados necesitas y escribes la lógica.'

// ✅ REQUISITOS (en orden de dificultad)
// 1. Un tablero de 16 cartas boca abajo (8 pares de colores, desordenados)
// 2. Al hacer clic, la carta se da vuelta y muestra su color
// 3. Si das vuelta dos cartas del mismo color, quedan a la vista para siempre
// 4. Si no son iguales, se vuelven a esconder después de 1 segundo
// 5. Mientras hay dos cartas a la vista esperando, los clics no hacen nada
// 6. Un contador que diga "Movimientos: N" (cada par de cartas que das vuelta es un movimiento)
// 7. Cuando encuentras todos los pares, aparece "¡Ganaste! 🎉" con tus movimientos
// 8. Un botón "Jugar de nuevo" que reinicia todo, con las cartas desordenadas de nuevo
//
// Antes de programar, responde en papel: ¿qué cosas cambian mientras juegas?
// Cada una de esas cosas es un estado. Lo que se puede calcular a partir de ellas, no.

// 🎁 Esto ya viene hecho: los colores, cómo barajar y cómo se ve una carta.

const COLORES = ['#F94144', '#277DA1', '#43AA8B', '#F9C74F', '#9B5DE5', '#F3722C', '#F15BB5', '#90BE6D']

// Devuelve 16 cartas desordenadas: [{ id: 0, color: '#F94144' }, ...]
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
  // 🎃 Desde aquí es tuyo.

  return <p className="muted">Aquí va tu memorice. Usa barajar() y el componente Carta.</p>
}

// 💡 Pistas, solo si te quedas pegado (léelas de a una):
//
// Pista 1: con tres estados basta. Las cartas, las que están dadas vuelta ahora
//          y las que ya encontraste. Los movimientos pueden ser un cuarto estado.
//
// Pista 2: guarda ids en los arreglos, no las cartas completas.
//          Una carta está a la vista si su id está en alguno de los dos arreglos.
//
// Pista 3: "ganaste" no es un estado. Se calcula comparando cuántas encontraste
//          con cuántas cartas hay.
//
// Pista 4: para "Jugar de nuevo", las cartas también tienen que estar en el estado.
//          Si no, siempre quedan en el mismo orden.
//
// Pista 5: para esconderlas después de un segundo: setTimeout(() => ..., 1000)
