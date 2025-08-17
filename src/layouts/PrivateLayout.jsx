import { useState, useRef, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import styles from './PrivateLayout.module.css';

export default function PrivateLayout() {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (navbarRef.current) setNavbarHeight(navbarRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <>
      <div ref={navbarRef}>
        <Navbar />
      </div>

      <main style={{ '--navbar-height': `${navbarHeight}px` }}>
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </main>
    </>
  );
}