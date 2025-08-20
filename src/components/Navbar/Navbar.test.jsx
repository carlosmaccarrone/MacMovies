import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from '@/contexts/AuthContext';
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { jest } from '@jest/globals';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
});

describe("Navbar", () => {
  test("renders all main elements", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByAltText(/MacMovies Logo/i)).toBeInTheDocument();
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("NEWS")).toBeInTheDocument();
    expect(screen.getByText("LOGOUT")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search any movie/i)).toBeInTheDocument();
    expect(screen.getByText("🔍")).toBeInTheDocument();
    expect(screen.getByText("GENRE")).toBeInTheDocument();
  });

  test("buttons have correct text", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("NEWS")).toBeInTheDocument();
    expect(screen.getByText("LOGOUT")).toBeInTheDocument();
  });
});