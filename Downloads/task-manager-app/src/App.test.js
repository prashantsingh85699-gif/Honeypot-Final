import { render, screen } from '@testing-library/react';
import App from './App';

test('renders empty state message', () => {
  render(<App />);
  expect(
    screen.getByText(/nothing to do yet/i)
  ).toBeInTheDocument();
});
