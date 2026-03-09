import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthorForm from "../components/AuthorForm";

describe("AuthorForm Component", () => {
  test("Render del formulario con los campos requeridos", () => {
    render(<AuthorForm onSubmit={() => {}} />);

    const name_input = screen.getByLabelText(/Nombre/i);
    const birth_date_input = screen.getByLabelText(/Fecha de nacimiento/i);
    const image_input = screen.getByLabelText(/Imagen/i);
    const description_input = screen.getByLabelText(/Descripción/i);

    expect(name_input).toBeInTheDocument();
    expect(birth_date_input).toBeInTheDocument();
    expect(image_input).toBeInTheDocument();
    expect(description_input).toBeInTheDocument();
  });

  test("No permitir enviar formulario con campos vacíos", async () => {
    const user = userEvent.setup();
    const mock_submit = jest.fn();

    render(<AuthorForm onSubmit={mock_submit} />);

    const submit_button = screen.getByRole("button", { name: /Guardar/i });

    await user.click(submit_button);

    expect(mock_submit).not.toHaveBeenCalled();

    expect(submit_button).toBeDisabled();
  });
});

