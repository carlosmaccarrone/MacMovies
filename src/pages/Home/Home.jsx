import TrendingMoviesGrid from '@/pages/Home/TrendingMoviesGrid';
import styles from '@/pages/Home/Home.module.css';
import HeroSlider from '@/pages/Home/HeroSlider';
import { fetchFromTMDb } from '@/utils/tmdb';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner'

export default function Home() {
  const [trending, setTrending] = useState([]);

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

  console.log(trending)

  return (
    <div className={styles.homeWrapper}>
      {!trending.length && <Spinner />}

      {trending.length > 0 && (
        <>
          <HeroSlider movies={trending} />
          <TrendingMoviesGrid movies={trending} />
        </>
      )}
    </div>
  );
}