import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function AuthorForm({ initialData, onSubmit }) {
  const [form_state, setFormState] = useState(
    initialData || { name: "", description: "", birthDate: "", image: "" }
  );
  const [form_error, setFormError] = useState("");

  const getMissingRequiredFields = (state) => {
    const missing_fields = [];

    if (!state.name) missing_fields.push("Nombre");
    if (!state.birthDate) missing_fields.push("Fecha de nacimiento");
    if (!state.description) missing_fields.push("Descripción");

    return missing_fields;
  };

  const hasMissingRequiredFields = (state) => getMissingRequiredFields(state).length > 0;

  const buildValidationMessage = (state) => {
    const missing_fields = getMissingRequiredFields(state);
    return `Faltan campos obligatorios: ${missing_fields.join(", ")}.`;
  };

  const handleChange = (event) => {
    const next_state = { ...form_state, [event.target.name]: event.target.value };
    setFormState(next_state);

    if (form_error && !hasMissingRequiredFields(next_state)) {
      setFormError("");
    }
  };

  const handleBlur = () => {
    if (hasMissingRequiredFields(form_state)) {
      setFormError(buildValidationMessage(form_state));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasMissingRequiredFields(form_state)) {
      setFormError(buildValidationMessage(form_state));
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

