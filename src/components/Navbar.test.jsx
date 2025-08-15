import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

const genres = [
  { value: "28", name: "Action" },
  { value: "35", name: "Comedy" },
];

describe("Navbar", () => {
  test("renders all main elements", () => {
    render(<Navbar />);

    // Logo
    expect(screen.getByAltText(/MacMovies Logo/i)).toBeInTheDocument();

    // Main buttons
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("USER")).toBeInTheDocument();
    expect(screen.getByText("LOGOUT")).toBeInTheDocument();

    // Search input and button
    expect(screen.getByPlaceholderText(/Search any movie/i)).toBeInTheDocument();
    expect(screen.getByText("🔍")).toBeInTheDocument();

    // initial GenreSelect
    expect(screen.getByText("GENRE")).toBeInTheDocument();
  });

  test("GenreSelect inside Navbar opens and selects", () => {
    render(<Navbar />);
    
    const genreButton = screen.getByText("GENRE");
    fireEvent.click(genreButton);

    // options should now appear
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();

    // we select an option
    fireEvent.click(screen.getByText("Comedy"));
    expect(screen.getByText("Comedy")).toBeInTheDocument();

    // options should be closed
    expect(screen.queryByText("Action")).not.toBeInTheDocument();
  });

  test("buttons have correct text", () => {
    render(<Navbar />);

    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("USER")).toBeInTheDocument();
    expect(screen.getByText("LOGOUT")).toBeInTheDocument();
  });
});