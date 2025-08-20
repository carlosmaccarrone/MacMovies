import styles from "@/components/Navbar/Navbar.module.css";
import { useAuth } from '@/contexts/AuthContext';
import Select from "@/components/Select/Select";
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useState } from "react";

const genres = [
  { value: "28", name: "Action" },
  { value: "12", name: "Adventure" },
  { value: "16", name: "Animation" },
  { value: "35", name: "Comedy" },
  { value: "80", name: "Crime" },
  { value: "99", name: "Documentary" },
  { value: "18", name: "Drama" },
  { value: "10751", name: "Family" },
  { value: "14", name: "Fantasy" },
  { value: "36", name: "History" },
  { value: "27", name: "Horror" },
  { value: "10402", name: "Music" },
  { value: "9648", name: "Mystery" },
  { value: "10749", name: "Romance" },
  { value: "878", name: "Sci-Fi" },
  { value: "10770", name: "TV Movie" },
  { value: "53", name: "Thriller" },
  { value: "10752", name: "War" },
  { value: "37", name: "Western" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [search, setSearch] = useState("");  

  const handleGenreSelect = (genre) => {
    navigate(`/home?genre=${genre.value}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    navigate("/goodbye");
    setTimeout(() => logout(), 2000);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logoSection}>
        <Logo width="170px" />
        <span className={styles.provider}>Movie data provided by TMDb</span>
      </div>

      <nav className={styles.navLinks}>
        <button
          className={styles.navButton}
          onClick={() => navigate("/home")}
        >
          HOME
        </button>

        <Select
          className={styles.genreSelect}
          options={genres}
          placeholder="GENRE"
          onSelect={(genre) => { handleGenreSelect(genre) }}
        />
      </nav>

      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <button type="submit" className={styles.searchButton}>🔍</button>
        <input
          type="text"
          placeholder="Search any movie you want"
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className={styles.userControls}>
        <button className={styles.newsButton} onClick={() => navigate("/news")}>NEWS</button>      
        <button className={styles.logoutButton} onClick={() => handleLogout()}>LOGOUT</button>
      </div>
    </header>
  );
};

export default Navbar;