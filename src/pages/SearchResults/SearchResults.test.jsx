import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { jest } from '@jest/globals';

// basic mockup of MoviesGrid and Spinner only
await jest.unstable_mockModule('@/components/MoviesGrid/MoviesGrid', () => ({
  default: () => <div>MoviesGridMock</div>
}));
await jest.unstable_mockModule('@/components/Spinner/Spinner', () => ({
  default: () => <div role="status">SpinnerMock</div>
}));

const { default: SearchResults } = await import('@/pages/SearchResults/SearchResults');

describe("SearchResults basic smoke tests", () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });  

  test("renders without exploding", () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    // look for a key text that always appears
    expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
  });

  test("contains a main container", () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    const container = screen.getByText(/No movies found/i).parentElement;
    expect(container).toBeInTheDocument();
  });

  test("render multiple times without exploding", () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    // we search for all elements with that text
    const elements = screen.getAllByText(/No movies found/i);
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});