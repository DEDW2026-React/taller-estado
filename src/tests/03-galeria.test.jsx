import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Galeria from '@taller/03-galeria'
import artists from '../data/artists.json'

const siguiente = () => screen.getByRole('button', { name: /siguiente/i })
const anterior = () => screen.getByRole('button', { name: /anterior/i })

describe('03 Anterior / Siguiente', () => {
  test('parte en el primer artista', () => {
    render(<Galeria />)
    expect(screen.getByRole('heading')).toHaveTextContent(artists[0].name)
    expect(screen.getByText(/1 de 12/)).toBeInTheDocument()
  })

  test('"Siguiente" muestra el segundo artista y "2 de 12"', async () => {
    render(<Galeria />)
    await userEvent.click(siguiente())

    expect(screen.getByRole('heading')).toHaveTextContent(artists[1].name)
    expect(screen.getByText(/2 de 12/)).toBeInTheDocument()
  })

  test('"Anterior" vuelve al artista de antes', async () => {
    render(<Galeria />)
    await userEvent.click(siguiente())
    await userEvent.click(siguiente())
    await userEvent.click(anterior())

    expect(screen.getByRole('heading')).toHaveTextContent(artists[1].name)
  })
})
