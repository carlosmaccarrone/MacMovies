import { useEffect, useState } from 'react';
import { fetchFromTMDb } from '@/utils/tmdb';
import Spinner from '@/components/Spinner/Spinner';
import styles from './News.module.css';
import { Link } from 'react-router-dom';

export default function News({ fetchFn = fetchFromTMDb }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await fetchFn('movie/now_playing', { language: 'en-US', page: 1 });

        const moviesWithExtras = await Promise.all(
          data.results.map(async (movie) => {
            try {
              const videosData = await fetchFn(`movie/${movie.id}/videos`, { language: 'en-US' });
              const trailers = videosData.results.filter(v => v.type === 'Trailer' && v.site === 'YouTube');

              const reviewsData = await fetchFn(`movie/${movie.id}/reviews`, { language: 'en-US', page: 1 });
              let bestReview = null;
              if (reviewsData.results.length > 0) {
                bestReview = reviewsData.results.reduce((a, b) => a.content.length > b.content.length ? a : b).content;
                bestReview = bestReview.slice(0, 250) + (bestReview.length > 250 ? '...' : '');
              }

              return { ...movie, trailerKey: trailers[0]?.key || null, review: bestReview };
            } catch {
              return { ...movie, trailerKey: null, review: null };
            }
          })
        );

        setMovies(moviesWithExtras);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getNowPlayingMovies();
  }, [fetchFn]);

  if (loading) return <div className={styles.spinnerContainer}><Spinner /></div>;

  return (
    <div className={styles.newsContainer}>
      <h1 className={styles.title}>Now Playing</h1>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.movieBox} data-testid="movie-box">
          <Link to={`/movie/${movie.id}`} state={{ movie }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
          </Link>
          <div className={styles.details}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p className={styles.overview}>{movie.overview}</p>
            <small className={styles.releaseDate}>Release date: {movie.release_date}</small>
            {movie.trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.trailerButton}
              >
                Watch Trailer
              </a>
            )}
            {movie.review && (
              <div className={styles.reviewBox}>
                <p
                  className={styles.review}
                  dangerouslySetInnerHTML={{ __html: `<strong>Best Review:</strong> ${movie.review}` }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}