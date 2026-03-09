import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function AuthorForm({ initialData, onSubmit }) {
  const [form_state, setFormState] = useState(
    initialData || { name: "", description: "", birthDate: "", image: "" }
  );

  const handleChange = (event) => {
    setFormState({ ...form_state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form_state.name || !form_state.birthDate || !form_state.description) return;
    onSubmit(form_state);
  };

  const is_disabled = !form_state.name || !form_state.birthDate || !form_state.description;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} htmlFor="name">Nombre:</label>
        <input
          id="name"
          name="name"
          className={styles.input}
          placeholder="Nombre"
          value={form_state.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="birthDate">Fecha de nacimiento:</label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          className={styles.input}
          value={form_state.birthDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="image">Imagen:</label>
        <input
          id="image"
          name="image"
          className={styles.input}
          placeholder="URL Imagen"
          value={form_state.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={styles.label} htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          placeholder="Descripción"
          value={form_state.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className={styles.button} disabled={is_disabled}>
        Guardar
      </button>
    </form>
  );
}

