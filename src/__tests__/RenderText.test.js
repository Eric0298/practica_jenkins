import React from 'react';
import { render, screen } from '@testing-library/react';
import RenderText from '../components/RenderText';

test('RenderText muestra el texto correcto', () => {
  render(<RenderText />);
  // Verifica si el texto esperado aparece en el DOM
  expect(screen.getByText('Has pasado el test')).toBeInTheDocument();
});