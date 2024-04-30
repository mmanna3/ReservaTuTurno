import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import useApiMutation from "../../api/custom-hooks/useApiMutation";
import { BotonSubmit } from "../../components/BotonSubmit";
import Form from "../../components/Form";
import FormInput from "../../components/FormInput";
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
          <FormInput<ProfesionalDTO> name="nombre" label="Nombre" required />
          <FormInput<ProfesionalDTO>
            name="apellido"
            label="Apellido"
            required
          />
          <FormInput<ProfesionalDTO> name="email" label="Email" required />
          <FormInput<ProfesionalDTO>
            name="telefono"
            label="Teléfono"
            required
          />
          <BotonSubmit texto="Agregar" estaDeshabilitado={mutation.isPending} />
        </Form>
      </div>
    </>
  );
};

export default CrearProfesionalPage;
