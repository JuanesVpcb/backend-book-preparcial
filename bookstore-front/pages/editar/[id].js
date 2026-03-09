import { useRouter } from "next/router";
import useAuthors from "../../hooks/useAuthors";
import AuthorForm from "../../components/AuthorForm";
import styles from "../../styles/Form.module.css";

export default function EditarAutor() {
  const router = useRouter();
  const { id } = router.query;
  const { authors, updateAuthor } = useAuthors();
  const author_to_edit = authors.find((author_item) => author_item.id === parseInt(id, 10));

  const handleSubmit = async (author_payload) => {
    await updateAuthor(author_to_edit.id, author_payload);
    router.push("/authors");
  };

  if (!author_to_edit) return <p>Cargando...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Autor</h1>
      <AuthorForm initialData={author_to_edit} onSubmit={handleSubmit} />
    </div>
  );
}