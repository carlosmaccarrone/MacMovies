import styles from "@/components/GenreSelect.module.css";
import { useState } from "react";

const GenreSelect = ({ genres, className }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("GENRE");

  const toggleOpen = () => setOpen(!open);

  const handleSelect = (genre) => {
    setSelected(genre);
    setOpen(false);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.selected} onClick={toggleOpen}>
        {selected} <span className={styles.arrow}>▾</span>
      </div>
      {open && (
        <div className={styles.options}>
          {genres.map((gen) => (
            <div
              key={gen.value}
              className={styles.option}
              onClick={() => handleSelect(gen.name)}
            >
              {gen.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreSelect;