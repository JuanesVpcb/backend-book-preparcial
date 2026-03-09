import { createContext, useContext, useState, useEffect } from "react";

const AuthorsContext = createContext();
const API_URL = "http://localhost:8080/api/authors";

export function AuthorsProvider({ children }) {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status} al obtener autores`);
      }

      const author_list = await response.json();
      setAuthors(Array.isArray(author_list) ? author_list : []);
    } catch (error) {
      console.error("Error al obtener autores:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const addAuthor = async (author_payload) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author_payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status} al crear autor`);
    }

    await fetchAuthors();
  };

  const updateAuthor = async (author_id, author_payload) => {
    const response = await fetch(`${API_URL}/${author_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author_payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status} al actualizar autor`);
    }

    await fetchAuthors();
  };

  const deleteAuthor = async (author_id) => {
    const response = await fetch(`${API_URL}/${author_id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status} al eliminar autor`);
    }

    await fetchAuthors();
  };

  return (
    <AuthorsContext.Provider
      value={{ authors, addAuthor, updateAuthor, deleteAuthor }}
    >
      {children}
    </AuthorsContext.Provider>
  );
}

export function useAuthorsContext() {
  return useContext(AuthorsContext);
}
