import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelect from "./GenreSelect";

const genres = [
  { value: "28", name: "Action" },
  { value: "35", name: "Comedy" },
];

describe("GenreSelect", () => {
  test("renders with initial text", () => {
    render(<GenreSelect genres={genres} />);
    expect(screen.getByText("GENRE")).toBeInTheDocument();
  });

  test("opens dropdown on click", () => {
    render(<GenreSelect genres={genres} />);
    const selected = screen.getByText("GENRE");
    fireEvent.click(selected);

    // options should now appear
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
  });

  test("selects an option and closes dropdown", () => {
    render(<GenreSelect genres={genres} />);
    const selected = screen.getByText("GENRE");
    fireEvent.click(selected);

    const option = screen.getByText("Comedy");
    fireEvent.click(option);

    // selected text changed
    expect(screen.getByText("Comedy")).toBeInTheDocument();

    // options are no longer displayed
    expect(screen.queryByText("Action")).not.toBeInTheDocument();
  });
});