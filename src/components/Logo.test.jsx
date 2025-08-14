import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import Logo from '@/components/Logo';

describe('Logo component', () => {
  test('renders without crashing', () => {
    render(<Logo src="test-file-stub" />);
    const img = screen.getByRole('img'); // select the image by its role
    expect(img).toBeInTheDocument();
  });

  test('renders with default alt and width', () => {
    render(<Logo src="test-file-stub" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'MacMovies Logo');
    expect(img).toHaveStyle({ width: '150px' });
  });

  test('renders with custom alt and width', () => {
    render(<Logo src="test-file-stub" alt="Custom Logo" width="200px" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Custom Logo');
    expect(img).toHaveStyle({ width: '200px' });
  });
});