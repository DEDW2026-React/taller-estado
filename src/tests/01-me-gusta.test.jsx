import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MeGusta from '@taller/01-me-gusta'

describe('01 Me gusta', () => {
  test('parte en 0', () => {
    render(<MeGusta />)
    expect(screen.getByRole('button')).toHaveTextContent('0')
  })

  test('suma 1 con cada clic', async () => {
    render(<MeGusta />)
    const boton = screen.getByRole('button')

    await userEvent.click(boton)
    expect(boton).toHaveTextContent('1')

    await userEvent.click(boton)
    expect(boton).toHaveTextContent('2')
  })
})
