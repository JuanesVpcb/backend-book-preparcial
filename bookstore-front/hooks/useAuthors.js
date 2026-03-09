import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/authors";

export default function useAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((author_list) => setAuthors(author_list))
      .catch((error) => console.error("Error al obtener autores:", error));
  }, []);

  const addAuthor = async (author_payload) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author_payload),
    });
    const new_author = await response.json();
    setAuthors([...authors, new_author]);
  };

  const updateAuthor = async (author_id, author_payload) => {
    const response = await fetch(`${API_URL}/${author_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author_payload),
    });
    const updated_author = await response.json();
    setAuthors(authors.map((author_item) => (author_item.id === author_id ? updated_author : author_item)));
  };

  const deleteAuthor = async (author_id) => {
    await fetch(`${API_URL}/${author_id}`, { method: "DELETE" });
    setAuthors(authors.filter((author_item) => author_item.id !== author_id));
  };

  return { authors, addAuthor, updateAuthor, deleteAuthor };
}
