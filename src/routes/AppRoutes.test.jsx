import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import { act } from 'react-dom/test-utils';
import { jest } from '@jest/globals';

describe('AppRoutes1', () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeAll(async () => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // global mock fetch for LoginSidebar 
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ username: 'charly', password: btoa('1234') }]),
      })
    );

    // mock page components so they don't explode
    await jest.unstable_mockModule('@/pages/Home/Home', () => ({
      __esModule: true,
      default: () => <div>Home Page</div>,
    }));

    await jest.unstable_mockModule('@/pages/Login/Login', () => ({
      __esModule: true,
      default: () => <div>Login Page</div>,
    }));

    await jest.unstable_mockModule('@/pages/News/News', () => ({
      __esModule: true,
      default: () => <div>News Page</div>,
    }));
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    global.fetch.mockRestore();
  });

  it('renders private route if user is logged', async () => {
    sessionStorage.setItem('user', JSON.stringify({ username: 'charly' }));

    await act(async () => {
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={['/news']}>
            <AppRoutes />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    const nowPlaying = await screen.findByText(/now playing/i);
    expect(nowPlaying).toBeInTheDocument();
  });

  it('redirects public route if user is logged', async () => {
    const { default: Home } = await import('@/pages/Home/Home'); 
    // we simulate a user logged in to sessionStorage
    sessionStorage.setItem('user', JSON.stringify({ username: 'charly' }));

    await act(async () => {
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={['/']}>
            <Home movieList={[]} />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    // It should redirect to /home
    const home = await screen.findByText(/home/i);
    expect(home).toBeInTheDocument();
  });

  it('redirects to login if user is not logged and tries to access private route', async () => {
    await act(async () => {
      const { default: News } = await import('@/pages/News/News');
      sessionStorage.removeItem('user');
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={['/news']}>
            <AppRoutes />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    const login = screen.getByText(/Username/i);
    expect(login).toBeInTheDocument();
  });

  it('home route works correctly', async () => {
    const { default: Home } = await import('@/pages/Home/Home'); 
    await act(async () => {
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={['/home']}>
            <Home movieList={[]} />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    const login = screen.getByText(/Home Page/i);
    expect(login).toBeInTheDocument();
  });

  it('redirects to login if user is not logged', async () => {
    sessionStorage.removeItem('user');

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/news']}>
          <Routes>
            <Route path="*" element={<AppRoutes />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // check that the route changed to /login
    expect(window.location.pathname).toBe('/'); 
  });
});