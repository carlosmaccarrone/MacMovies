import { render, screen, fireEvent } from '@testing-library/react';
import HeroSlider from '@/pages/Home/HeroSlider';

const sampleMovies = [
  {
    id: 1,
    title: 'Movie 1',
    overview: 'Overview 1',
    backdrop_path: '/path1.jpg',
  },
  {
    id: 2,
    title: 'Movie 2',
    overview: 'Overview 2',
    backdrop_path: '/path2.jpg',
  },
];

describe('HeroSlider component', () => {
  test('renders nothing if movies array is empty', () => {
    const { container } = render(<HeroSlider movies={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders the first movie initially', () => {
    render(<HeroSlider movies={sampleMovies} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Movie 1');
    expect(screen.getByText('Overview 1')).toBeInTheDocument();
    expect(screen.getByAltText('Movie 1')).toHaveAttribute(
      'src',
      expect.stringContaining('/path1.jpg')
    );
  });

  test('clicking next shows the next movie', () => {
    render(<HeroSlider movies={sampleMovies} />);
    const nextButton = screen.getByText('>');

    // forzar imageLoaded a true simulando onLoad
    const img = screen.getByAltText('Movie 1');
    fireEvent.load(img);

    fireEvent.click(nextButton);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Movie 2');
  });

  test('clicking prev on first movie goes to last movie', () => {
    render(<HeroSlider movies={sampleMovies} />);
    const prevButton = screen.getByText('<');

    const img = screen.getByAltText('Movie 1');
    fireEvent.load(img);

    fireEvent.click(prevButton);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Movie 2');
  });
});