import { api } from "@api/api";
import { ServicioDTO, ServiciosDelProfesionalDTO } from "@api/clients";
import useApiMutation from "@api/custom-hooks/use-api-mutation";
import useApiQuery from "@api/custom-hooks/use-api-query";
import ContenidoConSpinnerYError from "@ui/contenido-con-spinner-y-error";
import Titulo from "@ui/titulo";
import Form from "@ui/user-input/form/form";
import { BotonSubmit } from "@ui/user-input/form/form-boton-submit";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CamposBasicos from "./componentes/campos-basicos";
import Equipo from "./componentes/equipo";

function seRepitenProfesionales(
  profesionalesQueLoBrindan: ServiciosDelProfesionalDTO[] | undefined,
) {
  if (!Array.isArray(profesionalesQueLoBrindan)) return false;

  const duplicadosEliminados = new Set(
    profesionalesQueLoBrindan.map((el) => el.profesionalId),
  );
  return profesionalesQueLoBrindan.length !== duplicadosEliminados.size;
}

const arreglarInstanciasDTOs = (servicio: ServicioDTO) => {
  if (Array.isArray(servicio.profesionalesQueLoBrindan)) {
    const instancias = servicio.profesionalesQueLoBrindan.map(
      (x) => new ServiciosDelProfesionalDTO(x),
    );
    servicio.profesionalesQueLoBrindan = instancias;
  }
  return servicio;
};

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
  } = useApiQuery({
    key: ["servicio", id],
    fn: async () => await api.servicioGET(Number(id)),
  });

  const mutation = useApiMutation<ServicioDTO>({
    fn: (servicio: ServicioDTO) =>
      api.servicioPUT(Number(servicio.id), servicio),
    antesDeMensajeExito: () => navigate(-1),
  });

  const onSubmit: SubmitHandler<ServicioDTO> = (servicio) => {
    if (seRepitenProfesionales(servicio.profesionalesQueLoBrindan)) {
      setErrorDosProfesionales("Hay profesionales repetidos.");
      return;
    }
    servicio = arreglarInstanciasDTOs(servicio);

    mutation.mutate(servicio);
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
          <BotonSubmit
            texto="Guardar cambios"
            estaDeshabilitado={mutation.isPending}
          />
        </Form>
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default EditarServicio;
