import { useState, useEffect } from 'react';
import styles from './Spinner.module.css'; // CSS Module

export default function Spinner() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingText} role="status">Loading{dots}</div>
    </div>
  );
}