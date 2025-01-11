import React from 'react';
import { render, screen } from '@testing-library/react';
import RenderLogo from '../components/RenderLogo';

test('RenderLogo muestra la imagen correctamente', () => {
  render(<RenderLogo />);

  // Verifica que la imagen esté presente en el DOM
  const logoElement = screen.getByAltText('Logo de ejemplo');
  expect(logoElement).toBeInTheDocument();

  // Verifica que la imagen tenga la URL correcta
  expect(logoElement).toHaveAttribute('src', 'logo.png');
});