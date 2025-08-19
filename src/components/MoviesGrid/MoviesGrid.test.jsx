import MoviesGrid from '@/components/MoviesGrid/MoviesGrid';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// sample data
const sampleMovies = [
  { id: 1, title: 'Movie 1', release_date: '2025-08-17', poster_path: '/path1.jpg' },
  { id: 2, title: 'Movie 2', release_date: '2024-05-10', poster_path: '/path2.jpg' },
];

let originalWarn;

beforeAll(() => {
  originalWarn = console.warn;
  console.warn = () => {};
});

afterAll(() => {
  console.warn = originalWarn;
});

describe('MoviesGrid component', () => {
  test('renders "No movies found." if movies array is empty', () => {
    render(
      <MemoryRouter>
        <MoviesGrid movies={[]} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });

  test('renders the correct number of movie cards', () => {
    render(
      <MemoryRouter>
        <MoviesGrid movies={sampleMovies} />
      </MemoryRouter>
    );
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(sampleMovies.length);
  });

  test('renders movie details correctly', () => {
    render(
      <MemoryRouter>
        <MoviesGrid movies={sampleMovies} />
      </MemoryRouter>
    );
    
    sampleMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.release_date.split('-')[0])).toBeInTheDocument();
      const img = screen.getByAltText(movie.title);
      expect(img).toHaveAttribute('src', expect.stringContaining(movie.poster_path));
    });
  });
});