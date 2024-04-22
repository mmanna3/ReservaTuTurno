import { endOfMonth, formatDate } from "date-fns";
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
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
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
    fn: async () => {
      const hoy = new Date();
      const mesQueViene = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);
      return await api.listarTurnosLibres(
        profesionalId,
        servicioId,
        formatDate(hoy, "dd-MM-yyyy"),
        formatDate(endOfMonth(mesQueViene), "dd-MM-yyyy"),
      );
    },
  });

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

  const diasDisponibles =
    turnosDisponibles?.map((x) => new Date(x.anio, x.mesIndex, x.diaDelMes)) ||
    [];

  const alSeleccionarDia = (dia: Date) => {
    const diaEnElArray = diasDisponibles.find(
      (x) => x.getTime() === dia.getTime(),
    );
    if (diaEnElArray) {
      const index = diasDisponibles.indexOf(diaEnElArray);
      if (turnosDisponibles)
        setHorariosDisponibles(turnosDisponibles[index].horarios || []);
    }
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

          <SelectorDia
            diasDisponibles={diasDisponibles}
            alSeleccionarDia={alSeleccionarDia}
          />
          <div className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-2">
            {horariosDisponibles.map((x) => (
              <div key={x} className="rounded-xl border border-grisclaro p-2">
                {x.slice(0, -3)}
              </div>
            ))}
          </div>
          <BotonSubmit texto="Agregar" estaDeshabilitado={mutation.isPending} />
        </Form>
      </div>
    </>
  );
};

export default CrearTurnosPage;
