import Spinner from '@/components/Spinner/Spinner';
import styles from '@/pages/Home/Home.module.css';
import HeroSlider from '@/pages/Home/HeroSlider';
import MoviesGrid from '@/pages/Home/MoviesGrid';
import { fetchFromTMDb } from '@/utils/tmdb';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home({ movies }) {
  const [movieList, setMovieList] = useState(movies || []);
  const location = useLocation();

  // extract query param "genre" if it exists
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get('genre');

  useEffect(() => {
    if (movies && movies.length > 0) {
      setMovieList(movies);
      return;
    }

    async function fetchMovies() {
      try {
        let data;
        if (genre) {
          data = await fetchFromTMDb(`discover/movie?with_genres=${genre}`);
        } else {
          data = await fetchFromTMDb('trending/movie/week');
        }
        setMovieList(data.results);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    }

    fetchMovies();
  }, [movies, genre]);

  return (
    <div className={styles.homeWrapper}>
      {!movieList.length && <Spinner />}
      {movieList.length > 0 && (
        <>
          <HeroSlider movies={movieList} />
          <MoviesGrid movies={movieList} />
        </>
      )}
    </div>
  );
}