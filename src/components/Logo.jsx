import styles from './Logo.module.css';
import logo from '../assets/logo.png';

export default function Logo({ alt = 'MacMovies Logo', size = 'medium' }) {
  return (
  	    <img src={logo} alt={alt} className={`${styles.logo} ${styles[size] || ''}`}
    />
  );
}