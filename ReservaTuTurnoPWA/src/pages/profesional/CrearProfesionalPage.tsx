import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import useApiMutation from "../../api/custom-hooks/useApiMutation";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Titulo from "../../components/Titulo";
import { generarRandom } from "../../utils";

const CrearProfesionalPage = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const mutation = useApiMutation({
    mensajeDeExito: "Profesional dado de alta",
    fn: async (profesional: ProfesionalDTO) => {
      return await api.profesionalPOST(profesional);
    },
    antesDeMensajeExito: () =>
      navigate(`/profesionales?refreshToken=${generarRandom()}`),
  });

  const onSubmit: SubmitHandler<ProfesionalDTO> = (data) => {
    mutation.mutate(data);
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
    </>
  );
};

export default CrearProfesionalPage;
