
import { render, screen } from '@testing-library/react';
import RenderLink from '../components/RenderLink';


test('RenderLink muestra el enlace correcto', () => {
  render(<RenderLink />);

  // Verifica si el enlace tiene el texto correcto
  const linkElement = screen.getByText('Haz clic aquí');
  expect(linkElement).toBeInTheDocument();

  // Verifica si el enlace tiene el href correcto
  expect(linkElement).toHaveAttribute('href', 'https://www.ejemplo.com');
});