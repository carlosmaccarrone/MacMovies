import { useLocation } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import { fetchFromTMDb } from "@/utils/tmdb";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

const MovieDetail = () => {
  const location = useLocation();
  const movieFromState = location.state?.movie;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!movieFromState?.id) return;

    const fetchMovieDetail = async () => {
      setLoading(true);
      try {
        const data = await fetchFromTMDb(`movie/${movieFromState.id}`, {
          append_to_response: "credits",
        });

        const director = data.credits?.crew?.find(
          (c) => c.job === "Director"
        )?.name;

        setMovie({
          ...data,
          director,
          cast: data.credits?.cast?.slice(0, 10).map((c) => c.name),
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieFromState]);

  if (!movieFromState || loading) return <Spinner />;

  if (!imgLoaded) {
    return (
      <>
        <Spinner />
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onLoad={() => setImgLoaded(true)}
          style={{ display: "none" }}
        />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />

      <div className={styles.details}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.overview}>{movie.overview}</p>

        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        <p><strong>Runtime:</strong> {movie.runtime} min</p>
        <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Countries:</strong> {movie.production_countries?.map(c => c.name).join(", ")}</p>
        <p><strong>Production:</strong> {movie.production_companies?.map(c => c.name).join(", ")}</p>

        <div className={styles.cast}>
          <strong>Cast:</strong>
          <ul className={styles.castList}>
            {movie.cast?.map((actor) => (
              <li key={actor}>{actor}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;