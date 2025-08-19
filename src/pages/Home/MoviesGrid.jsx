import styles from '@/pages/Home/MoviesGrid.module.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { poster_path, title, release_date, id } = movie;
  return (
    <li className={styles.movieCard}>
      <Link to={`/movie/${id}`} state={{ movie }}> {/* pasamos movie por state */}
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w185${poster_path}`}
            alt={title}
          />
        )}
        <h3>{title}</h3>
        <p>{release_date?.split('-')[0]}</p>
      </Link>
    </li>
  );
};

const MoviesGrid = ({ movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <ul className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesGrid;