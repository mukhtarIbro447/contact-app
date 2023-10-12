import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// simple test for demo
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});
