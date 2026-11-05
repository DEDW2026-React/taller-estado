import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Agregar from '@taller/05-agregar'

async function agregar(nombre) {
  await userEvent.type(screen.getByRole('textbox'), nombre)
  await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))
}

describe('05 Agregar artista', () => {
  test('parte con Queen y Metallica', () => {
    render(<Agregar />)
    expect(screen.getByText(/Queen/)).toBeInTheDocument()
    expect(screen.getByText(/Metallica/)).toBeInTheDocument()
  })

  test('agrega el artista a la lista', async () => {
    render(<Agregar />)
    await agregar('Slipknot')

    expect(screen.getByText(/Slipknot/)).toBeInTheDocument()
    expect(screen.getByText(/Queen/)).toBeInTheDocument()
  })

  test('el botón "Agregar a Adele" actualiza la lista (sin push)', async () => {
    render(<Agregar />)
    await userEvent.click(screen.getByRole('button', { name: 'Agregar a Adele' }))

    const nombres = screen.getAllByRole('listitem').map(item => item.textContent)
    expect(
      nombres.some(nombre => nombre.includes('Adele')),
      'Adele no apareció en la lista. Si usaste push, React no ve un arreglo nuevo y no renderiza',
    ).toBe(true)
  })

  test('limpia el input después de agregar', async () => {
    render(<Agregar />)
    await agregar('Slipknot')
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  test('se pueden agregar varios artistas', async () => {
    render(<Agregar />)
    await agregar('Slipknot')
    await agregar('Adele')

    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })
})
