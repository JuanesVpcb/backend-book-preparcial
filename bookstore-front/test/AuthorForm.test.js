import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthorForm from "../components/AuthorForm";

describe("Componente AuthorForm", () => {
  test("Render del formulario con los campos requeridos y estado desactivado del botón de envío", () => {
    render(<AuthorForm onSubmit={() => {}} />);

    // Localiza campos y botón de envío
    const name_input = screen.getByLabelText(/Nombre/i);
    const birth_date_input = screen.getByLabelText(/Fecha de nacimiento/i);
    const image_input = screen.getByLabelText(/Imagen/i);
    const description_input = screen.getByLabelText(/Descripción/i);
    const submit_button = screen.getByRole("button", { name: /Guardar/i });

    expect(submit_button).toBeInTheDocument();
    expect(submit_button).toBeDisabled(); // El botón debe estar deshabilitado inicialmente
    expect(name_input).toBeInTheDocument();
    expect(birth_date_input).toBeInTheDocument();
    expect(image_input).toBeInTheDocument();
    expect(description_input).toBeInTheDocument();
  });

  test("No enviar un form con campos vacíos / nulos", async () => {
    const user = userEvent.setup();
    const mock_submit = jest.fn();

    render(<AuthorForm onSubmit={mock_submit} />);

    const submit_button = screen.getByRole("button", { name: /Guardar/i });

    await user.click(submit_button);

    expect(mock_submit).not.toHaveBeenCalled();
    expect(submit_button).toBeDisabled();
  });

  test("Enviar un form con campos incompletos, verificando que no se pueda enviar", async () => {
    const user = userEvent.setup();
    const mock_submit = jest.fn();

    render(<AuthorForm onSubmit={mock_submit} />);

    const birth_date_input = screen.getByLabelText(/Fecha de nacimiento/i);
    const image_input = screen.getByLabelText(/Imagen/i);
    const submit_button = screen.getByRole("button", { name: /Guardar/i });

    await user.type(birth_date_input, "1927-03-06");
    await user.type(image_input, "https://example.com/garcia-marquez.jpg");

    expect(submit_button).toBeDisabled(); // El botón debe volver a estar deshabilitado después de intentar enviar con campos incompletos

    await user.click(submit_button);

    expect(mock_submit).not.toHaveBeenCalled();
  });

  test("Enviar un form con todos los campos completos, verificando que se llame a la función de envío", async () => {
    const user = userEvent.setup();
    const mock_submit = jest.fn();

    render(<AuthorForm onSubmit={mock_submit} />);

    const name_input = screen.getByLabelText(/Nombre/i);
    const birth_date_input = screen.getByLabelText(/Fecha de nacimiento/i);
    const image_input = screen.getByLabelText(/Imagen/i);
    const description_input = screen.getByLabelText(/Descripción/i);
    const submit_button = screen.getByRole("button", { name: /Guardar/i });

    await user.type(name_input, "Gabriel García Márquez");
    await user.type(birth_date_input, "1927-03-06");
    await user.type(image_input, "https://example.com/garcia-marquez.jpg");
    await user.type(description_input, "Escritor colombiano, ganador del Premio Nobel de Literatura en 1982.");

    expect(submit_button).toBeEnabled();

    await user.click(submit_button);

    expect(mock_submit).toHaveBeenCalledTimes(1);
    expect(mock_submit).toHaveBeenCalledWith({
      name: "Gabriel García Márquez",
      birthDate: "1927-03-06",
      image: "https://example.com/garcia-marquez.jpg",
      description: "Escritor colombiano, ganador del Premio Nobel de Literatura en 1982.",
    });
  });

  test("Prueba de limpieza de errores y habilitación con flujo válido asíncrono", async () => {
    const user = userEvent.setup();

    render(<AuthorForm onSubmit={() => {}} />);

    const name_input = screen.getByLabelText(/Nombre/i);
    const birth_date_input = screen.getByLabelText(/Fecha de nacimiento/i);
    const description_input = screen.getByLabelText(/Descripción/i);
    const image_input = screen.getByLabelText(/Imagen/i);
    const submit_button = screen.getByRole("button", { name: /Guardar/i });

    await user.click(name_input);
    await user.tab();

    expect(screen.getByRole("alert")).toBeInTheDocument(); // Mensaje de error presente

    await user.type(name_input, "Isabel Allende");
    await user.type(birth_date_input, "1942-08-02");
    await user.type(description_input, "Escritora chilena.");
    await user.type(image_input, "https://example.com/allende.jpg");

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(submit_button).toBeEnabled();
    });
  });
});

