import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';

// ESM module mocks before importing LoginForm
await jest.unstable_mockModule('@/contexts/AuthContext', () => ({
  useAuth: () => ({ login: loginMock }),
}));

await jest.unstable_mockModule('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

// We import the component after applying the mocks
const { default: LoginForm } = await import('@/pages/Login/LoginForm');

// login and navigate mocks
const loginMock = jest.fn();
const navigateMock = jest.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    jest.useRealTimers();
    
    // mock global fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('renders without crash and shows inputs and button', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error when username or password is incorrect', async () => {
    jest.useFakeTimers();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [], // there aren't users
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    jest.advanceTimersByTime(400);

    await waitFor(() =>
      expect(screen.getByText(/incorrect username or password/i)).toBeInTheDocument()
    );

    jest.useRealTimers();
  });

  test('calls login and navigate when credentials are correct', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ username: 'test', password: btoa('1234') }],
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(loginMock).toHaveBeenCalledWith('test'));
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/home'));
  });
});