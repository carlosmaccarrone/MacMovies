import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import News from '@/pages/News/News';
import { jest } from '@jest/globals';

describe('News Component', () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  const mockMovies = [
    { id: 1, title: 'Movie One', overview: 'Overview 1', poster_path: '/poster1.jpg', release_date: '2025-08-01' },
    { id: 2, title: 'Movie Two', overview: 'Overview 2', poster_path: '/poster2.jpg', release_date: '2025-08-02' },
  ];

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('renders spinner initially', () => {
    render(<News />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders movies with trailer and review', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie One', overview: 'Overview 1', poster_path: '/poster1.jpg', release_date: '2025-08-01' },
      { id: 2, title: 'Movie Two', overview: 'Overview 2', poster_path: '/poster2.jpg', release_date: '2025-08-02' },
    ];

    const mockFetch = jest.fn(async (endpoint) => {
      if (endpoint === 'movie/now_playing') return { results: mockMovies };
      if (endpoint.includes('/videos')) return { results: [{ type: 'Trailer', site: 'YouTube', key: 'abcd1234' }] };
      if (endpoint.includes('/reviews')) return { results: [{ content: 'Best review ever' }] };
      return { results: [] };
    });

    render(
      <MemoryRouter>
        <News fetchFn={mockFetch} />
      </MemoryRouter>
    );

    const heading = await screen.findByText(/Now Playing/i);
    expect(heading).toBeInTheDocument();

    const movieBoxes = await screen.findAllByTestId('movie-box');
    expect(movieBoxes.length).toBe(2);
  });

  it('renders movies without trailer or review gracefully', async () => {
    const mockFetch = jest.fn(async (endpoint) => {
      if (endpoint === 'movie/now_playing') return { results: mockMovies };
      if (endpoint.includes('/videos')) return { results: [] }; // no trailers
      if (endpoint.includes('/reviews')) return { results: [] }; // no reviews
      return { results: [] };
    });

    render(
      <MemoryRouter>
        <News fetchFn={mockFetch} />
      </MemoryRouter>
    );

    const movieBoxes = await screen.findAllByTestId('movie-box');
    expect(movieBoxes.length).toBe(2);

    // you shouldn't find any trailer or review buttons.
    expect(screen.queryByText(/Watch Trailer/i)).toBeNull();
    expect(screen.queryByText(/Best Review:/i)).toBeNull();
  });

  it('handles fetch errors without crashing', async () => {
    const mockFetch = jest.fn(async () => {
      throw new Error('Network error');
    });

    render(
      <MemoryRouter>
        <News fetchFn={mockFetch} />
      </MemoryRouter>
    );

    // we hope there is no movie box
    const movieBoxes = await screen.findAllByTestId('movie-box').catch(() => []);
    expect(movieBoxes.length).toBe(0);

    // title "Now Playing" is still present
    expect(screen.getByText(/Now Playing/i)).toBeInTheDocument();

    // verify that console.error was called
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});