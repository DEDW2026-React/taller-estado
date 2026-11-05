import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Buscador from '@taller/04-buscador'

describe('04 Buscador', () => {
  test('parte mostrando los 12 artistas', () => {
    render(<Buscador />)
    expect(screen.getAllByRole('listitem')).toHaveLength(12)
    expect(screen.getByText(/Mostrando 12 de 12/)).toBeInTheDocument()
  })

  test('el input muestra lo que se escribe', async () => {
    render(<Buscador />)
    await userEvent.type(screen.getByRole('textbox'), 'queen')
    expect(screen.getByRole('textbox')).toHaveValue('queen')
  })

  test('filtra la lista mientras se escribe', async () => {
    render(<Buscador />)
    await userEvent.type(screen.getByRole('textbox'), 'queen')

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByRole('listitem')).toHaveTextContent('Queen')
    expect(screen.getByText(/Mostrando 1 de 12/)).toBeInTheDocument()
  })

  test('no distingue mayúsculas de minúsculas', async () => {
    render(<Buscador />)
    await userEvent.type(screen.getByRole('textbox'), 'METALLICA')
    expect(screen.getByRole('listitem')).toHaveTextContent('Metallica')
  })

  test('al borrar el texto vuelven los 12 artistas', async () => {
    render(<Buscador />)
    await userEvent.type(screen.getByRole('textbox'), 'queen')
    await userEvent.clear(screen.getByRole('textbox'))
    expect(screen.getAllByRole('listitem')).toHaveLength(12)
  })
})
