import { render, screen, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';

await jest.unstable_mockModule('@/pages/Home/HeroSlider', () => ({
  default: jest.fn(() => <div data-testid="hero-slider" />)
}));

await jest.unstable_mockModule('@/pages/Home/TrendingMoviesGrid', () => ({
  default: jest.fn(() => <div data-testid="trending-grid" />)
}));

await jest.unstable_mockModule('@/utils/tmdb', () => ({
  fetchFromTMDb: jest.fn()
}));

const { default: Home } = await import('@/pages/Home/Home');
const { fetchFromTMDb } = await import('@/utils/tmdb');
const HeroSlider = (await import('@/pages/Home/HeroSlider')).default;
const TrendingMoviesGrid = (await import('@/pages/Home/TrendingMoviesGrid')).default;

describe('Home component', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows spinner while loading', () => {
    render(<Home />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders HeroSlider and TrendingMoviesGrid after fetching', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', backdrop_path: '/path1.jpg' },
      { id: 2, title: 'Movie 2', backdrop_path: '/path2.jpg' },
    ];

    fetchFromTMDb.mockResolvedValue({ results: mockMovies });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('hero-slider')).toBeInTheDocument();
      expect(screen.getByTestId('trending-grid')).toBeInTheDocument();
    });
  });
});