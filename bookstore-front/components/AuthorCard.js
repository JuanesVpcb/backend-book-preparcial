import Link from "next/link";
import { useAuthorsContext } from "../context/AuthorsContext";
import styles from "../styles/Card.module.css";

export default function AuthorCard({ author }) {
  const { deleteAuthor } = useAuthorsContext();
  const author_id = author.id;

  return (
    <div className={styles.card}>
      <h3>{author.name}</h3>
      <p>{author.description}</p>
      <p><strong>Nacimiento:</strong> {author.birthDate}</p>
      {author.image && <img src={author.image} alt={author.name} width="120" />}

      <div className={styles.actions}>
        <Link href={`/editar/${author_id}`}>
          <button className={`${styles.button} ${styles.edit}`}>Editar</button>
        </Link>
        <button
          className={`${styles.button} ${styles.delete}`}
          onClick={() => deleteAuthor(author_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}