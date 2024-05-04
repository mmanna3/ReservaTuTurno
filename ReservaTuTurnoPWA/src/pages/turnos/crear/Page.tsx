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
import Titulo from "../../../ui/titulo";
import Autocomplete, { Opcion } from "../../../ui/user-input/autocomplete";
import { Dropdown } from "../../../ui/user-input/dropdown";
import Form from "../../../ui/user-input/form/form";
import { BotonSubmit } from "../../../ui/user-input/form/form-boton-submit";
import FormDayPicker from "../../../ui/user-input/form/form-day-picker";
import FormHiddenInput from "../../../ui/user-input/form/form-hidden-input";
import { convertirEnOptions, generarRandom } from "../../../utilidades";

const CrearTurnosPage = () => {
  const navigate = useNavigate();

  const [servicioId, setServicioId] = useState<number | undefined>(undefined);
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const [profesionalId, setProfesionalId] = useState<number | undefined>(
    undefined,
  );
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>("");

  const mutation = useApiMutation({
    mensajeDeExito: "Turno registrado",
    fn: async (turno: TurnoDTO) => {
      return await api.turnoPOST(turno);
    },
    antesDeMensajeExito: () =>
      navigate(`/turnos?refreshToken=${generarRandom()}`),
  });

  const onSubmit: SubmitHandler<TurnoDTO> = (data) => {
    // console.log(data);
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

  const onHoraClick = (hora: string) => {
    setHoraSeleccionada(hora);
  };

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

  const books: Opcion[] = [
    { id: "book-1", valor: "To Kill a Mockingbird" },
    { id: "book-2", valor: "War and Peace" },
    { id: "book-3", valor: "The Idiot" },
  ];

  return (
    <>
      <div className="w-full">
        <Form<TurnoDTO> onSubmit={onSubmit}>
          <Titulo>Nuevo turno</Titulo>
          <Autocomplete label="libros" opciones={books} />
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

          <FormDayPicker<TurnoDTO>
            diasDisponibles={diasDisponibles}
            onChange={alSeleccionarDia}
            name="fecha"
            required
          />
          <div className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-2">
            {horariosDisponibles.map((x) => (
              <button
                type="button"
                key={x}
                onClick={() => onHoraClick(x)}
                className={
                  horaSeleccionada === x
                    ? "rounded-xl bg-rosa p-2 text-blanco"
                    : "rounded-xl border border-grisclaro p-2"
                }
              >
                {x.slice(0, -3)}
              </button>
            ))}
          </div>
          <FormHiddenInput<TurnoDTO> name="hora" value={horaSeleccionada} />
          <BotonSubmit texto="Agregar" estaDeshabilitado={mutation.isPending} />
        </Form>
      </div>
    </>
  );
};

export default CrearTurnosPage;
