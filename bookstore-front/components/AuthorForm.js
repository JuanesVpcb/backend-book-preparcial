import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function AuthorForm({ initialData, onSubmit }) {
  const [form_state, setFormState] = useState(
    initialData || { name: "", description: "", birthDate: "", image: "" }
  );
  const [form_error, setFormError] = useState("");

  const hasMissingRequiredFields = (state) =>
    !state.name || !state.birthDate || !state.description;

  const handleChange = (event) => {
    const next_state = { ...form_state, [event.target.name]: event.target.value };
    setFormState(next_state);

    if (form_error && !hasMissingRequiredFields(next_state)) {
      setFormError("");
    }
  };

  const handleBlur = () => {
    if (hasMissingRequiredFields(form_state)) {
      setFormError("Completa los campos obligatorios.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasMissingRequiredFields(form_state)) {
      setFormError("Completa los campos obligatorios.");
      return;
    }

    setFormError("");
    onSubmit(form_state);
  };

  const is_disabled = hasMissingRequiredFields(form_state);

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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
          required
        />
      </div>

      {form_error && <p role="alert">{form_error}</p>}

      <button type="submit" className={styles.button} disabled={is_disabled}>
        Guardar
      </button>
    </form>
  );
}

