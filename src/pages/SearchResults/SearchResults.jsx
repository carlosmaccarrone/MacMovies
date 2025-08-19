import MoviesGrid from "@/components/MoviesGrid/MoviesGrid";
import Spinner from "@/components/Spinner/Spinner";
import styles from './SearchResults.module.css';
import { useLocation } from "react-router-dom";
import { fetchFromTMDb } from "@/utils/tmdb";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFromTMDb("search/movie", { query });
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!movies.length) return <p className={styles.notFound}>No movies found for "{query}", sorry!</p>;

  return (
    <div className={styles.container}>
      {movies.length > 0 ? <MoviesGrid movies={movies} /> : <p>No movies found</p>}
    </div>
  );
};

export default SearchResults;