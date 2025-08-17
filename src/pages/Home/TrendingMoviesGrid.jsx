import styles from '@/pages/Home/TrendingMoviesGrid.module.css';

const TrendingMoviesGrid = ({ movies }) => {
  return (
    <ul className={styles.movieGrid}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieCard}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
            />
          )}
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split('-')[0]}</p>
        </li>
      ))}
    </ul>
  );
}

export default TrendingMoviesGrid;