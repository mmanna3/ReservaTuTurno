import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { ServicioDTO, ServiciosDelProfesionalDTO } from "../../../api/clients";
import ContenidoConSpinnerYError from "../../../components/ContenidoConSpinnerYError";
import Form from "../../../components/Form";
import Titulo from "../../../components/Titulo";
import CamposBasicos from "../components/CamposBasicos";
import Equipo from "../components/Equipo";

function seRepitenProfesionales(
  profesionalesQueLoBrindan: ServiciosDelProfesionalDTO[] | undefined,
) {
  if (!Array.isArray(profesionalesQueLoBrindan)) return false;

  const duplicadosEliminados = new Set(
    profesionalesQueLoBrindan.map((el) => el.profesionalId),
  );
  return profesionalesQueLoBrindan.length !== duplicadosEliminados.size;
}

const EditarServicio = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();
  const { id } = useParams();

  const [hayProfesionalesDuplicados, setErrorDosProfesionales] = useState("");

  const {
    data: servicio,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["servicio-" + id],
    queryFn: async () => await api.servicioGET(Number(id)),
    throwOnError: true,
  });

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (servicio: ServicioDTO) => {
      try {
        if (Array.isArray(servicio.profesionalesQueLoBrindan)) {
          const instancias = servicio.profesionalesQueLoBrindan.map(
            (x) => new ServiciosDelProfesionalDTO(x),
          );
          servicio.profesionalesQueLoBrindan = instancias;
        }
        await api.servicioPUT(Number(id), servicio);
      } catch (error) {
        console.log("Error en Request", error);
        throw new Error("Error en el servidor");
      }
    },
    onError: (error) => console.log("Error mutation:", error.message),
    onSuccess: () => console.log("Guardado"),
  });

  const onSubmit: SubmitHandler<ServicioDTO> = (data) => {
    try {
      if (seRepitenProfesionales(data.profesionalesQueLoBrindan)) {
        setErrorDosProfesionales("Hay profesionales repetidos.");
        return;
      }
      mutation.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContenidoConSpinnerYError
      isLoading={isFetching || isLoading}
      error={error}
      hasData={servicio != undefined}
    >
      <div className="w-full">
        <Form<ServicioDTO> onSubmit={onSubmit} defaultValues={servicio}>
          <Titulo>Editar Servicio</Titulo>

          <CamposBasicos />

          <div className="mb-5 mt-8 border-t border-grisclaro"></div>
          <Equipo />

          {hayProfesionalesDuplicados !== "" ? (
            <div className="mt-6 rounded-xl border-2 border-red-200 bg-red-100 p-3 ">
              <span className="text-sm text-rojo">
                {hayProfesionalesDuplicados}
              </span>
            </div>
          ) : null}
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
            {mutation.isSuccess ? (
              <div>Servicio editado correctamente</div>
            ) : null}
          </>
        )}
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default EditarServicio;
