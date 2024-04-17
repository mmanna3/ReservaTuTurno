import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
  AgendaDTO,
  AgendaServicioProfesionalDTO,
  FranjaHorariaDTO,
  ProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "../../../api/clients";
import ContenidoConSpinnerYError from "../../../components/ContenidoConSpinnerYError";
import Form from "../../../components/Form";
import Titulo from "../../../components/Titulo";
import AgendasDelProfesional from "./AgendasDelProfesional";

const Agendas = () => {
  const { id: profesionalId } = useParams();
  const {
    data: profesional,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["profesional-" + profesionalId],
    queryFn: async () => await api.profesionalGET(Number(profesionalId)),
    throwOnError: true,
  });

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (profesional: ProfesionalDTO) => {
      try {
        const response = await api.profesionalPUT(
          Number(profesionalId),
          profesional,
        );
        console.log("agendaCreada", response);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => console.log(error.message),
  });

  const onSubmit: SubmitHandler<ProfesionalDTO> = (profesional) => {
    try {
      profesional.agendas = profesional.agendas?.map((a) => {
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

      mutation.mutate(profesional);
      // navigate(-1);
    } catch (error) {
      console.error(error);
    }
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

          <input
            type="submit"
            className="mt-8 h-16 w-full rounded-xl bg-rosa text-lg font-medium text-blanco"
            value="Guardar cambios"
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
              <div>Servicio editado correctamente</div>
            ) : null}
          </>
        )}
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default Agendas;
