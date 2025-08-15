import GenreSelect from "@/components/GenreSelect";
import styles from "./Navbar.module.css";
import Logo from '@/components/Logo';

const genres = [
  { value: "28", name: "Action" },
  { value: "35", name: "Comedy" },
];

const Navbar = () => {
  return (
    <header className={styles.navbar}>

      <div className={styles.logoSection}>
        <Logo width="170px" />
        <span className={styles.provider}>Movie data provided by TMDb</span>
      </div>

      <nav className={styles.navLinks}>
        <button className={styles.navButton}>HOME</button>

        <GenreSelect className={styles.genreSelect} genres={genres} />
      </nav>

      <div className={styles.searchContainer}>
        <button className={styles.searchButton}>
          🔍
        </button>        
        <input
          type="text"
          placeholder="Search any movie you want"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.userControls}>
        <button className={styles.userButton}>USER</button>
        <button className={styles.logoutButton}>LOGOUT</button>
      </div>
    </header>
  );
}

export default Navbar; 