import styles from "@/components/Select/Select.module.css";
import { useState, useRef, useEffect } from "react";

const Select = ({ options, placeholder = "Select...", className, onSelect }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOpen = () => setOpen(!open);

  const handleSelect = (option) => {
    setOpen(false);
    if (onSelect) onSelect(option); // callback al seleccionar
  };

  // Cerrar el dropdown si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onMouseLeave={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
    >
      <div className={styles.selected} onClick={toggleOpen}>
        {placeholder} <span className={styles.arrow}>▾</span>
      </div>

      {open && (
        <div className={styles.options}>
          {options.map((opt, idx) => (
            <div
              key={opt.value ?? idx}
              className={styles.option}
              onClick={() => handleSelect(opt)}
            >
              {opt.name ?? opt.label ?? opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;