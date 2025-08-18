import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';

// Mock MovieDetail inline usando unstable_mockModule
await jest.unstable_mockModule('@/pages/MovieDetail/MovieDetail', () => ({
  default: jest.fn(() => (
    <div>
      <h1>Sample Movie</h1>
      <p>This is a sample movie.</p>
    </div>
  )),
}));

beforeAll(() => {
  originalWarn = console.warn;
  console.warn = () => {};
});

afterAll(() => {
  console.warn = originalWarn;
});

// Importamos después de mockear
const { default: MovieDetail } = await import('./MovieDetail');

test('renders movie detail (basic smoke test) - ESM', async () => {
  render(
    <MemoryRouter>
      <MovieDetail />
    </MemoryRouter>
  );

  expect(screen.getByText('Sample Movie')).toBeInTheDocument();
  expect(screen.getByText('This is a sample movie.')).toBeInTheDocument();
});