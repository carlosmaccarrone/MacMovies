import { useEffect, useState, useRef } from 'react';
import styles from '@/pages/Home/Home.module.css';
import HeroSlider from '@/pages/Home/HeroSlider';
import { fetchFromTMDb } from '@/utils/tmdb';
import Navbar from '@/components/Navbar'

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);

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

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('header'); // navbar is fixed
      if (navbar) setNavbarHeight(navbar.offsetHeight);
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  const handlePrev = () => {
    setSliderIndex((prev) => (trending.length ? (prev === 0 ? trending.length - 1 : prev - 1) : 0));
  };

  const handleNext = () => {
    setSliderIndex((prev) => (trending.length ? (prev === trending.length - 1 ? 0 : prev + 1) : 0));
  };

  const topMovie = trending[sliderIndex] || null;

  return (
    <>
      <Navbar />

      <div
        className={styles.homeContainer}
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        {!trending.length || !topMovie ? (
          <p>Loading...</p>
        ) : (

          <div className={styles.heroWrapper}>
            <HeroSlider
              topMovie={trending[sliderIndex]}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        )}
      </div>
    </>
  );
}