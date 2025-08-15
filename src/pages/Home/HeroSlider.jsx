import styles from '@/pages/Home/HeroSlider.module.css';
import { useState } from 'react';

const HeroSlider = ({ topMovie, handlePrev, handleNext }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);

  if (!topMovie) return null;

  const safePrev = () => {
    if (!imageLoaded || blocked) return;
    setBlocked(true);
    handlePrev();
    setTimeout(() => setBlocked(false), 400);
  };

  const safeNext = () => {
    if (!imageLoaded || blocked) return;
    setBlocked(true);
    handleNext();
    setTimeout(() => setBlocked(false), 400);
  };

  return (
    <div className={styles.hero}>
      {topMovie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`}
          alt={topMovie.title}
          className={styles.heroImage}
          onLoad={() => setImageLoaded(true)}
        />
      )}

      <div className={styles.heroText}>
        <h1>{topMovie.title}</h1>
        <p>{topMovie.overview}</p>
      </div>

      <div className={styles.sliderButtons}>
        <button onClick={safePrev} disabled={!imageLoaded || blocked}>
          &lt;
        </button>
        <button onClick={safeNext} disabled={!imageLoaded || blocked}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default HeroSlider;