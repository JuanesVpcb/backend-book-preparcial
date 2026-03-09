import { useState } from "react";
import Link from "next/link";
import { useAuthorsContext } from "../context/AuthorsContext";
import AuthorCard from "../components/AuthorCard";
import styles from "../styles/Authors.module.css";

export default function AuthorsPage() {
  const { authors } = useAuthorsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuthors = authors.filter((author_item) =>
    author_item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Autores</h1>
        <Link href="/crear" className={styles.createButton}>
          + Crear Autor
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar por nombre"
          className={styles.searchInput}
        />
      </div>
      <div>
        {filteredAuthors.length > 0 ? (
          filteredAuthors.map((author_item) => (
            <AuthorCard key={author_item.id} author={author_item} />
          ))
        ) : (
          <p className={styles.noResultsMessage}>
            No se encontraron autores con ese nombre.
          </p>
        )}
      </div>
    </div>
  );
}