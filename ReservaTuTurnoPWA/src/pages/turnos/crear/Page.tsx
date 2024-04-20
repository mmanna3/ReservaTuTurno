import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import { TurnoDTO } from "../../../api/clients";
import useApiMutation from "../../../api/custom-hooks/useApiMutation";
import { BotonSubmit } from "../../../components/BotonSubmit";
import Form from "../../../components/Form";
import Titulo from "../../../components/Titulo";
import { generarRandom } from "../../../utils";

const CrearProfesionalPage = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const mutation = useApiMutation({
    mensajeDeExito: "Turno registrado",
    fn: async (turno: TurnoDTO) => {
      return await api.turnoPOST(turno);
    },
    antesDeMensajeExito: () =>
      navigate(`/turnos?refreshToken=${generarRandom()}`),
  });

  const onSubmit: SubmitHandler<TurnoDTO> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="w-full">
        <Form<TurnoDTO> onSubmit={onSubmit}>
          <Titulo>Nuevo turno</Titulo>
          <BotonSubmit texto="Agregar" estaDeshabilitado={mutation.isPending} />
        </Form>
      </div>
    </>
  );
};

export default CrearProfesionalPage;
