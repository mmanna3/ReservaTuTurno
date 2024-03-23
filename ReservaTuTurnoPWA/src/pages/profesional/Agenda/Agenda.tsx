import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { AgendaDTO } from "../../../api/clients";
import ContenidoConSpinnerYError from "../../../components/ContenidoConSpinnerYError";
import Form from "../../../components/Form";
import FormHiddenInput from "../../../components/FormHiddenInput";
import Titulo from "../../../components/Titulo";
import AgendaServicios from "./AgendaServicios";
import DiasDeLaSemana from "./DiasDeLaSemanaCheckboxs";
import { FranjasHorarias } from "./FranjasHorarias";

const Agenda = () => {
  const navigate = useNavigate();
  const { id: profesionalId } = useParams();

  const {
    data: serviciosDelProfesional,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["profesional-servicio-" + profesionalId],
    queryFn: async () => await api.servicios(Number(profesionalId)),
    throwOnError: true,
  });

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (agenda: AgendaDTO) => {
      try {
        const response = await api.agendaPOST(agenda);
        console.log("agendaCreada", response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<AgendaDTO> = (data) => {
    try {
      console.log(data);
      mutation.mutate(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContenidoConSpinnerYError
      isLoading={isFetching || isLoading}
      error={error}
      hasData={serviciosDelProfesional != undefined}
    >
      <div className="w-full">
        <Form<AgendaDTO> onSubmit={onSubmit}>
          <Titulo>Agenda</Titulo>
          <FormHiddenInput<AgendaDTO>
            name="profesionalId"
            value={profesionalId as string}
          />
          <DiasDeLaSemana />
          <FranjasHorarias />
          <AgendaServicios />
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

export default Agenda;
