import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function AuthorSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="search"
        className={styles.input}
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" className={styles.button}>Buscar</button>
    </form>
  );
}