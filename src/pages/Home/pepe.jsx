import styles from '@/pages/Home/Home.module.css';
import { fetchFromTMDb } from '@/utils/tmdb';
import { useEffect, useState } from 'react';

function Home() {
  const [trending, setTrending] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    async function getTrending() {
      try {
        const data = await fetchFromTMDb('trending/movie/week');
        setTrending(data.results);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    }
    getTrending();
  }, []);

  const handlePrev = () => {
    setSliderIndex((prev) => (trending.length ? (prev === 0 ? trending.length - 1 : prev - 1) : 0));
  };

  const handleNext = () => {
    setSliderIndex((prev) => (trending.length ? (prev === trending.length - 1 ? 0 : prev + 1) : 0));
  };

  const topMovie = trending[sliderIndex] || null;

  return (
    <div className={styles.homeContainer}>
      {!trending.length || !topMovie ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Trending Movies</h2>

          <div className={styles.hero}>
            {topMovie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`}
                alt={topMovie.title}
                className={styles.heroImage}
                style={{ willChange: 'transform', transform: 'translateZ(0)' }} // fuerza GPU
              />
            )}
            <div className={styles.heroText}>
              <h1>{topMovie.title}</h1>
              <p>{topMovie.overview}</p>
            </div>

            <div className={styles.sliderButtons}>
              <button onClick={handlePrev}>&lt;</button>
              <button onClick={handleNext}>&gt;</button>
            </div>
          </div>

          <ul className={styles.movieGrid}>
            {trending.map((movie) => (
              <li key={movie.id} className={styles.movieCard}>
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0]}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;