import { useRouter } from "next/router";
import { useAuthorsContext } from "../context/AuthorsContext";
import AuthorForm from "../components/AuthorForm";

export default function CrearAutor() {
  const { addAuthor } = useAuthorsContext();
  const router = useRouter();

  const handleSubmit = async (author_payload) => {
    await addAuthor(author_payload);
    router.push("/authors");
  };

  return (
    <div>
      <h1>Crear Autor</h1>
      <AuthorForm onSubmit={handleSubmit} />
    </div>
  );
}
