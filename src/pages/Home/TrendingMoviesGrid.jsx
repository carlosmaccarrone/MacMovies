import styles from '@/pages/Home/TrendingMoviesGrid.module.css';

const MovieCard = ({ movie }) => {
  const { poster_path, title, release_date } = movie;
  return (
    <li className={styles.movieCard}>
      {poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w185${poster_path}`}
          alt={title}
        />
      )}
      <h3>{title}</h3>
      <p>{release_date?.split('-')[0]}</p>
    </li>
  );
};

const TrendingMoviesGrid = ({ movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <ul className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default TrendingMoviesGrid;