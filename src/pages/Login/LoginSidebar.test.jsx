import { render, screen, within, waitFor } from '@testing-library/react';
import LoginSidebar from '@/pages/Login/LoginSidebar';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

// helper to simulate fetch with custom users
const makeUsers = (users) =>
  users.map((u) => ({
    username: u.username,
    password: btoa(u.password),
  }));

// helper for mocking fetch with custom users
const mockFetchUsers = (users) => {
  global.mockFetch(makeUsers(users));
};

// helper to mock an error in fetch
const mockFetchError = () => {
  global.mockFetch(null, false); // ok = false → rejected promise
};

afterEach(() => {
  jest.resetAllMocks();
});

describe('LoginSidebar component', () => {
  test('renders users from dynamic mock', async () => {
    const testUsers = [
      { username: 'elon.musk', password: 'abc123' },
      { username: 'lito.cruz', password: 'qwerty' },
      { username: 'cantinflas', password: 'pass123' },
    ];

    mockFetchUsers(testUsers);

    render(<LoginSidebar />);

    const table = await screen.findByRole('table');

    await waitFor(() => {
      const rows = within(table).getAllByRole('row');
      expect(rows).toHaveLength(1 + testUsers.length);
    });

    const rows = within(table).getAllByRole('row');
    testUsers.forEach((u, index) => {
      const row = rows[index + 1]; // we skip header
      expect(within(row).getByText(u.username)).toBeInTheDocument();
      expect(within(row).getByText(u.password)).toBeInTheDocument();
    });
  });

  test('renders empty table when no users are returned', async () => {
    mockFetchUsers([]);

    render(<LoginSidebar />);

    const table = await screen.findByRole('table');

    await waitFor(() => {
      const rows = within(table).getAllByRole('row');
      expect(rows).toHaveLength(1); // header only
    });
  });

  test('handles fetch error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetchError();

    render(<LoginSidebar />);

    const table = await screen.findByRole('table');

    await waitFor(() => {
      const rows = within(table).getAllByRole('row');
      expect(rows).toHaveLength(1); // header only
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('renders the footer text', async () => {
    mockFetchUsers([]);

    render(<LoginSidebar />);

    await screen.findByText((content) =>
      content.includes('Welcome to the podium of top movie ratings and reviews')
    );

    expect(screen.getByText((content) => content.includes('data from TMDb'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('clean design'))).toBeInTheDocument();
  });
});