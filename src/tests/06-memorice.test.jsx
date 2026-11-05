import { act, fireEvent, render, screen } from '@testing-library/react'
import Memorice from '@taller/06-memorice'

const cartas = () => {
  const lista = [...document.querySelectorAll('.carta')]
  expect(lista, 'No encontré las 16 cartas. ¿Usaste el componente Carta?').toHaveLength(16)
  return lista
}
const estaOculta = carta => carta.style.backgroundColor === 'gray'
const clic = carta => fireEvent.click(carta)
const esperar = (ms = 1100) => act(() => { vi.advanceTimersByTime(ms) })

// Da vuelta las cartas de a dos para conocer el color de cada una
function leerColores() {
  const colores = []
  for (let i = 0; i < 16; i += 2) {
    clic(cartas()[i])
    clic(cartas()[i + 1])
    colores[i] = cartas()[i].style.backgroundColor
    colores[i + 1] = cartas()[i + 1].style.backgroundColor
    expect(colores[i + 1], 'Al dar vuelta la segunda carta, debe verse su color').not.toBe('gray')
    esperar()
  }
  return colores
}

// Índices de dos cartas ocultas con el mismo color, o con distinto color
function buscarOcultas(colores, mismoColor) {
  const ocultas = cartas().flatMap((carta, i) => (estaOculta(carta) ? [i] : []))
  for (const a of ocultas) {
    for (const b of ocultas) {
      if (a !== b && (colores[a] === colores[b]) === mismoColor) return [a, b]
    }
  }
  throw new Error('No encontré cartas para hacer la prueba')
}

function ganar(colores) {
  // Como máximo 8 pares: si algo falla, el test termina en vez de quedarse pegado
  for (let par = 0; par < 8 && cartas().some(estaOculta); par++) {
    const [a, b] = buscarOcultas(colores, true)
    clic(cartas()[a])
    clic(cartas()[b])
    esperar()
  }
}

const movimientos = () => {
  const texto = document.body.textContent
  const encontrado = texto.match(/movimientos\D*(\d+)/i) ?? texto.match(/(\d+)\s*movimientos/i)
  expect(encontrado, 'No encontré el texto "Movimientos: N" en la pantalla').not.toBeNull()
  return Number(encontrado[1])
}

describe('06 Desafío: memorice', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  test('1. hay 16 cartas boca abajo, 8 pares de colores', () => {
    render(<Memorice />)
    expect(cartas().every(estaOculta)).toBe(true)

    const colores = leerColores()
    const cuantas = Object.groupBy(colores, color => color)
    expect(Object.keys(cuantas)).toHaveLength(8)
    expect(Object.values(cuantas).every(grupo => grupo.length === 2)).toBe(true)
  })

  test('2. al hacer clic, la carta muestra su color', () => {
    render(<Memorice />)
    clic(cartas()[0])
    expect(estaOculta(cartas()[0])).toBe(false)
  })

  test('3. dos cartas iguales quedan a la vista', () => {
    render(<Memorice />)
    const colores = leerColores()
    const [a, b] = buscarOcultas(colores, true)

    clic(cartas()[a])
    clic(cartas()[b])
    esperar(5000)

    expect(estaOculta(cartas()[a])).toBe(false)
    expect(estaOculta(cartas()[b])).toBe(false)
  })

  test('4. dos cartas distintas se esconden después de 1 segundo', () => {
    render(<Memorice />)
    const colores = leerColores()
    const [a, b] = buscarOcultas(colores, false)

    clic(cartas()[a])
    clic(cartas()[b])
    expect(estaOculta(cartas()[b]), 'La segunda carta debe verse antes de esconderse').toBe(false)

    esperar()
    expect(estaOculta(cartas()[a])).toBe(true)
    expect(estaOculta(cartas()[b])).toBe(true)
  })

  test('5. con dos cartas a la vista, los clics no hacen nada', () => {
    render(<Memorice />)
    const colores = leerColores()
    const [a, b] = buscarOcultas(colores, false)
    const tercera = cartas().findIndex((carta, i) => estaOculta(carta) && i !== a && i !== b)

    clic(cartas()[a])
    clic(cartas()[b])
    clic(cartas()[tercera])

    expect(estaOculta(cartas()[tercera])).toBe(true)
  })

  test('6. cuenta un movimiento por cada par de cartas', () => {
    render(<Memorice />)
    expect(movimientos()).toBe(0)

    clic(cartas()[0])
    expect(movimientos()).toBe(0)

    clic(cartas()[1])
    expect(movimientos()).toBe(1)
  })

  test('7. al encontrar todos los pares aparece "¡Ganaste!"', () => {
    render(<Memorice />)
    expect(screen.queryByText(/ganaste/i)).not.toBeInTheDocument()

    ganar(leerColores())
    expect(screen.getByText(/ganaste/i)).toBeInTheDocument()
  })

  test('8. "Jugar de nuevo" reinicia todo y vuelve a barajar', () => {
    render(<Memorice />)
    const antes = leerColores()
    ganar(antes)

    fireEvent.click(screen.getByRole('button', { name: /jugar de nuevo/i }))

    expect(cartas().every(estaOculta)).toBe(true)
    expect(movimientos()).toBe(0)
    expect(screen.queryByText(/ganaste/i)).not.toBeInTheDocument()
    expect(leerColores()).not.toEqual(antes)
  })
})
