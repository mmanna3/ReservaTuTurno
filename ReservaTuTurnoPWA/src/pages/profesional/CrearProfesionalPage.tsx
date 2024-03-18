import { useMutation } from "@tanstack/react-query";
import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Titulo from "../../components/Titulo";

const CrearProfesionalPage = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (profesional: ProfesionalDTO) => {
      try {
        const profesionalCreado = await api.profesionalPOST(profesional);
        console.log("profesionalCreado", profesionalCreado);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<ProfesionalDTO> = (data) => {
    try {
      console.log(data);
      mutation.mutate(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Form<ProfesionalDTO> onSubmit={onSubmit}>
          <Titulo>Nuevo profesional</Titulo>
          <Input<ProfesionalDTO> name="nombre" label="Nombre" required />
          <Input<ProfesionalDTO> name="apellido" label="Apellido" required />
          <Input<ProfesionalDTO> name="email" label="Email" required />
          <Input<ProfesionalDTO> name="telefono" label="Teléfono" required />
          <input
            type="submit"
            className="mt-8 h-16 w-full rounded-xl bg-rosa text-lg font-medium text-blanco"
            value="Agregar"
          />
        </Form>
      </div>
      <div>
        {mutation.isPending ? (
          "Adding todo..."
        ) : (
          <>
            {mutation.isError ? (
              <div>Hubo un error: {mutation.error.message}</div>
            ) : null}

            {mutation.isSuccess ? (
              <div>Profesional agregado correctamente</div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default CrearProfesionalPage;
