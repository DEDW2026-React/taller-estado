import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VerMas from '@taller/02-ver-mas'
import artists from '../data/artists.json'

const inicioBiografia = artists[0].profile.slice(0, 30)

describe('02 Ver más / Ver menos', () => {
  test('parte con la biografía oculta', () => {
    render(<VerMas />)
    expect(screen.getByRole('button')).toHaveTextContent('Ver más')
    expect(screen.queryByText(content => content.startsWith(inicioBiografia))).not.toBeInTheDocument()
  })

  test('"Ver más" muestra la biografía y el botón cambia a "Ver menos"', async () => {
    render(<VerMas />)
    await userEvent.click(screen.getByRole('button'))

    expect(screen.getByText(content => content.startsWith(inicioBiografia))).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Ver menos')
  })

  test('"Ver menos" vuelve a ocultar la biografía', async () => {
    render(<VerMas />)
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByRole('button'))

    expect(screen.queryByText(content => content.startsWith(inicioBiografia))).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Ver más')
  })
})
