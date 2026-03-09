import Link from "next/link";
import { useAuthorsContext } from "../context/AuthorsContext";
import AuthorCard from "../components/AuthorCard";
import styles from "../styles/Authors.module.css";

export default function AuthorsPage() {
  const { authors } = useAuthorsContext();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Autores</h1>
        <Link href="/crear" className={styles.createButton}>
          + Crear Autor
        </Link>
      </div>
      <div>
        <BarProps />
      </div>
      <div>
        {authors.map((author_item) => (
          <AuthorCard key={author_item.id} author={author_item} />
        ))}
      </div>
    </div>
  );
}