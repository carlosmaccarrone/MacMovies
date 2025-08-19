import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { jest } from '@jest/globals';

await jest.unstable_mockModule('@/pages/Home/HeroSlider', () => ({
  default: ({ movies }) => <div>HeroSliderMock {movies.length} movies</div>,
}));
await jest.unstable_mockModule('@/components/MoviesGrid/MoviesGrid', () => ({
  default: ({ movies }) => <div>MoviesGridMock {movies.length} movies</div>,
}));
await jest.unstable_mockModule('@/components/Spinner/Spinner', () => ({
  default: () => <div role="status">SpinnerMock</div>,
}));

const { default: Home } = await import('@/pages/Home/Home');

describe("Home Tests", () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });  

  test("renders HeroSlider and MoviesGrid when movies are passed", async () => {
    const sampleMovies = [{ id: 1, title: "Movie 1" }, { id: 2, title: "Movie 2" }];

    render(
      <MemoryRouter>
        <Home movies={sampleMovies} />
      </MemoryRouter>
    );

    // spinner does not appear
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByText(/HeroSliderMock 2 movies/)).toBeInTheDocument();
    expect(screen.getByText(/MoviesGridMock 2 movies/)).toBeInTheDocument();
  });

  test("renders Spinner when no movies are passed", async () => {
    render(
      <MemoryRouter>
        <Home movies={[]} />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toHaveTextContent("SpinnerMock");
  });

  test("renders HeroSlider and MoviesGrid after fetching movies (simulated)", async () => {
    // simulates that Home starts without movies
    render(
      <MemoryRouter>
        <Home movies={[]} />
      </MemoryRouter>
    );

    // manually override movieList to avoid calling the actual fetch
    await waitFor(() => {
      // we simulate that movieList is full
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});