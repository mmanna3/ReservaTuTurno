import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { ServicioDTO } from "../../../api/clients";
import ContenidoConSpinnerYError from "../../../components/ContenidoConSpinnerYError";
import Form from "../../../components/Form";
import Titulo from "../../../components/Titulo";
import CamposBasicos from "../components/CamposBasicos";

const EditarServicio = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: servicio,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["servicio"],
    queryFn: async () => await api.servicioGET(Number(id)),
    throwOnError: true,
  });

  const [_servicio, setServicio] = useState<ServicioDTO | undefined>(undefined);

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (servicio: ServicioDTO) => {
      try {
        const servicioCreado = await api.servicioPUT(Number(id), servicio);
        console.log("servicioEditado", servicioCreado);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<ServicioDTO> = (data) => {
    try {
      console.log(data);
      mutation.mutate(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(servicio);
    setServicio(servicio);
  }, [servicio]);

  return (
    <ContenidoConSpinnerYError
      isLoading={isLoading}
      error={error}
      hasData={_servicio != undefined}
    >
      <div className="w-full">
        <Form<ServicioDTO> onSubmit={onSubmit} defaultValues={_servicio}>
          <Titulo>Editar Servicio</Titulo>
          <CamposBasicos />

          {/* <div className="mb-5 mt-8 border-t border-grisclaro"></div>
          <Equipo /> */}
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

export default EditarServicio;
