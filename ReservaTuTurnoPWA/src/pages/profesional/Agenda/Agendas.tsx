import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
  AgendaDTO,
  AgendaServicioProfesionalDTO,
  FranjaHorariaDTO,
  ProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "../../../api/clients";
import useApiMutation from "../../../api/custom-hooks/useApiMutation";
import useApiQuery from "../../../api/custom-hooks/useApiQuery";
import { BotonSubmit } from "../../../ui/BotonSubmit";
import ContenidoConSpinnerYError from "../../../ui/ContenidoConSpinnerYError";
import Form from "../../../ui/Form";
import Titulo from "../../../ui/Titulo";
import AgendasDelProfesional from "./AgendasDelProfesional";

const Agendas = () => {
  const { id: profesionalId } = useParams();
  const navigate = useNavigate();

  const {
    data: profesional,
    error,
    isLoading,
    isFetching,
  } = useApiQuery({
    key: ["profesional", profesionalId],
    fn: async () => await api.profesionalGET(Number(profesionalId)),
  });

  const mutation = useApiMutation({
    fn: async (profesional: ProfesionalDTO) => {
      await api.profesionalPUT(Number(profesionalId), profesional);
    },
    antesDeMensajeExito: () => navigate(-1),
    mensajeDeExito: "Agendas modificadas",
  });

  const onSubmit: SubmitHandler<ProfesionalDTO> = (profesional) => {
    profesional.agendas = mapearAgendaConSubrelaciones(profesional);

    mutation.mutate(profesional);
  };

  return (
    <ContenidoConSpinnerYError
      isLoading={isFetching || isLoading}
      error={error}
      hasData={profesional != undefined}
    >
      <div className="w-full">
        <Form<ProfesionalDTO> onSubmit={onSubmit} defaultValues={profesional}>
          <Titulo>Agenda</Titulo>
          <AgendasDelProfesional />
          <BotonSubmit texto="Guardar cambios" />
        </Form>
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default Agendas;

function mapearAgendaConSubrelaciones(
  profesional: ProfesionalDTO,
): AgendaDTO[] | undefined {
  return profesional.agendas?.map((a) => {
    if (Array.isArray(a.franjasHorarias)) {
      const franjas = a.franjasHorarias.map((x) => new FranjaHorariaDTO(x));
      a.franjasHorarias = franjas;
    }

    if (Array.isArray(a.servicios)) {
      const servicios = a.servicios.map((s) => {
        s.servicioProfesional = new ServiciosDelProfesionalDTO(
          s.servicioProfesional,
        );

        delete s.servicioProfesional;

        return new AgendaServicioProfesionalDTO(s);
      });

      a.servicios = servicios;
    }

    return new AgendaDTO(a);
  });
}
