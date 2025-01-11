
import { render, screen } from '@testing-library/react';


test('RenderLogo muestra la imagen correctamente', () => {
  render(<RenderLogo />);

  // Verifica que la imagen esté presente en el DOM
  const logoElement = screen.getByAltText('Logo de ejemplo');
  expect(logoElement).toBeInTheDocument();

  // Verifica que la imagen tenga la URL correcta
  expect(logoElement).toHaveAttribute('src', 'logo.png');
});