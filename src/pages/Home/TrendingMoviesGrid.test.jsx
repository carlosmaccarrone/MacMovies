import { render, screen } from '@testing-library/react';
import TrendingMoviesGrid from '@/pages/Home/TrendingMoviesGrid';

const sampleMovies = [
  { id: 1, title: 'Movie 1', release_date: '2025-08-17', poster_path: '/path1.jpg' },
  { id: 2, title: 'Movie 2', release_date: '2024-05-10', poster_path: '/path2.jpg' },
];

describe('TrendingMoviesGrid component', () => {
  test('renders nothing if movies array is empty', () => {
    const { container } = render(<TrendingMoviesGrid movies={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders the correct number of movie cards', () => {
    render(<TrendingMoviesGrid movies={sampleMovies} />);
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(sampleMovies.length);
  });

  test('renders movie details correctly', () => {
    render(<TrendingMoviesGrid movies={sampleMovies} />);
    
    sampleMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.release_date.split('-')[0])).toBeInTheDocument();
      const img = screen.getByAltText(movie.title);
      expect(img).toHaveAttribute('src', expect.stringContaining(movie.poster_path));
    });
  });
});