import styles from './Logo.module.css';
import logo from '../assets/logo.png';

const Logo = ({ alt = 'MacMovies Logo', width = '150px' }) => (
  <img src={logo} alt={alt} style={{ width }}
  />
);

export default Logo;