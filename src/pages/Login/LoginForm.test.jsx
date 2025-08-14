import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';

// create the mocks that we are going to spy on
const loginMock = jest.fn();
const navigateMock = jest.fn();

// mock ESM modules before importing LoginForm
await jest.unstable_mockModule('@/contexts/AuthContext', () => ({
  useAuth: () => ({ login: loginMock }),
}));

await jest.unstable_mockModule('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

// import the component with the mocks already applied
const { default: LoginForm } = await import('@/pages/Login/LoginForm');

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    jest.useRealTimers(); // ensure real timers by default
  });

  test('renders without crash and shows inputs and button', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error when username or password is incorrect', async () => {
    // activate fake timers just for this test
    jest.useFakeTimers();

    global.mockFetch([]);

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // wait for the internal setTimeout of the LoginForm
    jest.advanceTimersByTime(400);

    // use waitFor to ensure the message appears
    await waitFor(() =>
      expect(screen.getByText(/incorrect username or password/i)).toBeInTheDocument()
    );

    jest.useRealTimers();
  });

  test('call login and navigate when the data is correct', async () => {
    global.mockFetch([{ username: 'test', password: btoa('1234') }]);

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // expect all asynchronous logic to execute
    await waitFor(() => expect(loginMock).toHaveBeenCalledWith('test'));
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/home'));
  });
});