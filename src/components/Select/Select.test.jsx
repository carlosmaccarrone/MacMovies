import { render, screen, fireEvent } from "@testing-library/react";
import Select from "@/components/Select/Select";
import { jest } from '@jest/globals';

const genres = [
  { value: "28", name: "Action" },
  { value: "35", name: "Comedy" },
];

describe("Select component", () => {
  test("renders with initial placeholder", () => {
    render(<Select options={genres} placeholder="GENRE" />);
    expect(screen.getByText("GENRE")).toBeInTheDocument();
  });

  test("opens dropdown on click", () => {
    render(<Select options={genres} placeholder="GENRE" />);
    const selected = screen.getByText("GENRE");
    fireEvent.click(selected);

    // options should appear
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
  });

  test("selects an option and calls onSelect", () => {
    const handleSelect = jest.fn();
    render(<Select options={genres} placeholder="GENRE" onSelect={handleSelect} />);

    const selected = screen.getByText("GENRE");
    fireEvent.click(selected);

    const option = screen.getByText("Comedy");
    fireEvent.click(option);

    // callback llamado correctamente
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith({ value: "35", name: "Comedy" });

    // dropdown cerrado: ninguna opción visible
    expect(screen.queryByText("Action")).not.toBeInTheDocument();
    expect(screen.queryByText("Comedy")).not.toBeInTheDocument();
  });

  test("closes dropdown when clicking outside", () => {
    render(
      <div>
        <Select options={genres} placeholder="GENRE" />
        <button data-testid="outside">Outside</button>
      </div>
    );

    const selected = screen.getByText("GENRE");
    fireEvent.click(selected);

    // options should appear
    expect(screen.getByText("Action")).toBeInTheDocument();

    // click outside
    fireEvent.mouseDown(screen.getByTestId("outside"));

    // dropdown closed
    expect(screen.queryByText("Action")).not.toBeInTheDocument();
    expect(screen.queryByText("Comedy")).not.toBeInTheDocument();
  });  
});