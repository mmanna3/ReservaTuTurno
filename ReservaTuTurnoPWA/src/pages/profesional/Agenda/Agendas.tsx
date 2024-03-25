import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { ProfesionalDTO } from "../../../api/clients";
import ContenidoConSpinnerYError from "../../../components/ContenidoConSpinnerYError";
import Form from "../../../components/Form";
import Titulo from "../../../components/Titulo";
import AgendasDelProfesional from "./AgendasDelProfesional";

const Agendas = () => {
  const { id: profesionalId, navigate } = useParams();
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
  });

  const onSubmit: SubmitHandler<ProfesionalDTO> = (data) => {
    try {
      console.log(data);
      mutation.mutate(data);
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
          {/* {profesional?.agendas?.map((agenda) => <UnaAgenda agenda={agenda} />)} */}

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
