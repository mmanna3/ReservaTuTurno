import { useState } from "react";
import { Option } from "react-dropdown";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import {
  ProfesionalBaseDTO,
  ServicioConProfesionalesDTO,
  TurnoDTO,
} from "../../../api/clients";
import useApiMutation from "../../../api/custom-hooks/useApiMutation";
import useApiQuery from "../../../api/custom-hooks/useApiQuery";
import { BotonSubmit } from "../../../components/BotonSubmit";
import SelectorDia from "../../../components/DayPicker";
import { Dropdown } from "../../../components/Dropdown";
import Form from "../../../components/Form";
import Titulo from "../../../components/Titulo";
import { convertirEnOptions, generarRandom } from "../../../utils";

const CrearTurnosPage = () => {
  const navigate = useNavigate();

  const [servicioId, setServicioId] = useState<number | undefined>(undefined);
  const [profesionalId, setProfesionalId] = useState<number | undefined>(
    undefined,
  );

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

  const { data: serviciosConProfesionales } = useApiQuery({
    key: ["serviciosConProfesionales"],
    fn: async () => await api.serviciosConProfesionales(),
  });

  const { data: turnosDisponibles } = useApiQuery({
    key: ["turnosDisponibles", servicioId, profesionalId],
    activado: !!servicioId && !!profesionalId,
    fn: async () =>
      await api.listarTurnosLibres(
        profesionalId,
        servicioId,
        "20-04-2024",
        "20-05-2024",
      ),
  });

  console.log(turnosDisponibles);

  const [profesionalesDisponibles, setProfesionalesDisponibles] = useState<
    Option[]
  >([]);

  const OpcionesServicios = convertirEnOptions<ServicioConProfesionalesDTO>(
    serviciosConProfesionales || [],
    "servicio",
    "servicioId",
  );

  const actualizarProfesionalesDisponibles = (servicio: Option) => {
    const profesionales = serviciosConProfesionales?.find(
      (x) => x.servicioId === Number(servicio.value),
    )?.profesionales;

    const opcionesProfesionales = convertirEnOptions<ProfesionalBaseDTO>(
      profesionales || [],
      "nombre",
      "id",
    );

    setProfesionalesDisponibles(opcionesProfesionales);
  };

  return (
    <>
      <div className="w-full">
        <Form<TurnoDTO> onSubmit={onSubmit}>
          <Titulo>Nuevo turno</Titulo>
          <Dropdown<TurnoDTO>
            name="servicioId"
            label="Servicio"
            placeholder="Seleccioná el servicio"
            options={OpcionesServicios}
            onValueChange={(servicio) => {
              actualizarProfesionalesDisponibles(servicio);
              setProfesionalId(undefined);
              setServicioId(Number(servicio.value));
            }}
            required
          />

          <Dropdown<TurnoDTO>
            name="profesionalId"
            label="Profesional"
            placeholder="Seleccioná el profesional"
            options={profesionalesDisponibles}
            onValueChange={(profesional) =>
              setProfesionalId(Number(profesional.value))
            }
            required
          />

          <SelectorDia />

          <BotonSubmit texto="Agregar" estaDeshabilitado={mutation.isPending} />
        </Form>
      </div>
    </>
  );
};

export default CrearTurnosPage;
