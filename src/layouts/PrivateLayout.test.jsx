import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { jest } from '@jest/globals';

// navbar mock using unstable_mockModule
await jest.unstable_mockModule('@/components/Navbar/Navbar', () => ({
  default: () => <div>Navbar Mock</div>
}));

const { default: PrivateLayout } = await import('@/layouts/PrivateLayout');

describe("PrivateLayout", () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });  

  test("renders Navbar and Outlet", () => {
    render(
      <MemoryRouter>
        <PrivateLayout />
      </MemoryRouter>
    );

    // verify that the Navbar is rendered
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();

    // verify that the main exists (the Outlet is inside the main)
    const mainEl = screen.getByRole("main");
    expect(mainEl).toBeInTheDocument();
  });
});