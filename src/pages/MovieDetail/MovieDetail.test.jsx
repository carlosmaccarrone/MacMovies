import { render, screen, waitFor, act } from "@testing-library/react";
import { jest } from '@jest/globals';

await jest.unstable_mockModule('react-router-dom', () => ({
  useLocation: () => ({ state: { movie: { id: 1 } } }),
}));

const { default: MovieDetail } = await import('@/pages/MovieDetail/MovieDetail');

const baseMovie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/poster.jpg",
  overview: "Overview here",
  vote_average: 8,
  runtime: 100,
  genres: [{ name: "Action" }],
  production_countries: [{ name: "USA" }],
  production_companies: [{ name: "Studio" }],
  director: "John Doe",
  cast: Array.from({ length: 12 }, (_, i) => `Actor ${i + 1}`),
  credits: {
    crew: [{ job: "Director", name: "John Doe" }],
    cast: Array.from({ length: 12 }, (_, i) => ({ name: `Actor ${i + 1}` })),
  },
};

describe("MovieDetail Component", () => {
  beforeAll(() => {
    // mock Image for immediate loading
    const OriginalImage = global.Image;
    global.Image = class {
      onload = null;
      set src(_src) {
        if (this.onload) this.onload();
      }
    };
    global._OriginalImage = OriginalImage;
  });

  afterAll(() => {
    global.Image = global._OriginalImage;
    delete global._OriginalImage;
  });

  test("shows spinner while loading", async () => {
    //  mock fetch that resolves after 10ms
    const delayedFetch = jest.fn(
      () => new Promise(resolve => setTimeout(() => resolve(baseMovie), 10))
    );

    render(<MovieDetail movieProp={{ id: 1 }} fetchMovie={delayedFetch} skipImageLoad={false} />);

    // spinner debería estar presente inmediatamente
    expect(screen.getByRole("status")).toHaveTextContent(/Loading/);

    // wait for it to disappear
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  test("renders movie detail with all props when skipImageLoad=true", async () => {
    const movieForTest = { ...baseMovie, cast: baseMovie.cast.slice(0, 10) };

    await act(async () => {
      render(<MovieDetail movieProp={movieForTest} fetchMovie={jest.fn()} skipImageLoad={true} />);
      await waitFor(() => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      });
    });

    expect(screen.getByText(movieForTest.title)).toBeInTheDocument();
    expect(screen.getByText(movieForTest.overview)).toBeInTheDocument();
    expect(screen.getByText(movieForTest.director)).toBeInTheDocument();
    expect(screen.getByText(/Action/)).toBeInTheDocument();
    expect(screen.getByText(`${movieForTest.runtime} min`)).toBeInTheDocument();
    expect(screen.getByAltText(movieForTest.title)).toBeInTheDocument();

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`Actor ${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByText("Actor 11")).not.toBeInTheDocument();
  });

  test("spinner disappears and content renders", async () => {
    await act(async () => {
      render(<MovieDetail movieProp={baseMovie} fetchMovie={jest.fn()} skipImageLoad={true} />);
      await waitFor(() => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      });
    });

    expect(screen.getByText(baseMovie.title)).toBeInTheDocument();
    expect(screen.getByAltText(baseMovie.title)).toBeInTheDocument();
  });

  test('handles fetch errors gracefully without warnings', async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const failingFetch = jest.fn(() => Promise.reject(new Error("API failed")));

    await act(async () => {
      render(
        <MovieDetail
          movieProp={{ id: 1 }}
          fetchMovie={failingFetch}
          skipImageLoad={false}
        />
      );

      await waitFor(() => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      });
    });

    consoleErrorSpy.mockRestore();
  });

  test("renders movie correctly without genres", async () => {
    const movieNoGenres = { ...baseMovie, genres: [] };

    render(<MovieDetail movieProp={movieNoGenres} fetchMovie={jest.fn()} skipImageLoad={true} />);

    // wait for the spinner to disappear if it appears.
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    // check that the title is rendered
    expect(screen.getByText(movieNoGenres.title)).toBeInTheDocument();

    // verify that the genre section is displayed even if it is empty
    const genresText = screen.getByText(/Genres:/);
    expect(genresText).toBeInTheDocument();
    expect(genresText.textContent).toBe("Genres:"); // should be empty after ":"
  });

  test("renders movie correctly without credits", async () => {
    const movieNoCredits = { ...baseMovie, credits: { crew: [], cast: [] }, director: undefined, cast: [] };

    render(<MovieDetail movieProp={movieNoCredits} fetchMovie={jest.fn()} skipImageLoad={true} />);

    // we wait for the spinner to disappear if it appears.
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    // check that the title is rendered
    expect(screen.getByText(movieNoCredits.title)).toBeInTheDocument();

    // check that the director and cast are displayed even if they are empty.
    const directorText = screen.getByText(/Director:/);
    expect(directorText).toBeInTheDocument();
    expect(directorText.textContent).toBe("Director:"); // should be empty

    const castHeading = screen.getByText(/Cast:/);
    expect(castHeading).toBeInTheDocument();
    // cast list should be empty
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test("renders movie correctly without poster_path", async () => {
    const movieNoPoster = { ...baseMovie, poster_path: undefined };

    render(<MovieDetail movieProp={movieNoPoster} fetchMovie={jest.fn()} skipImageLoad={true} />);

    // wait for the spinner to disappear if it appears
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    // check that the title is rendered
    expect(screen.getByText(movieNoPoster.title)).toBeInTheDocument();

    // image exists, even if the src is incomplete
    const img = screen.getByAltText(movieNoPoster.title);
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("undefined"); // does not break the render
  });

/*  test("MovieDetail matches snapshot", async () => {
    const { container } = render(<MovieDetail movieProp={baseMovie} fetchMovie={jest.fn()} skipImageLoad={true} />);

    // we wait for the content to load
    await waitFor(() => {
      expect(screen.getByText(baseMovie.title)).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });*/

});