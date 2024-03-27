import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import { ServicioDTO, ServiciosDelProfesionalDTO } from "../../../api/clients";
import Form from "../../../components/Form";
import { Separador } from "../../../components/Separador";
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

const CrearServicio = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const [hayProfesionalesDuplicados, setErrorDosProfesionales] = useState("");

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

        const servicioCreado = await api.servicioPOST(servicio);
        console.log("servicioCreado", servicioCreado);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<ServicioDTO> = (data) => {
    try {
      if (seRepitenProfesionales(data.profesionalesQueLoBrindan)) {
        setErrorDosProfesionales("Hay profesionales repetidos.");
        return;
      }
      console.log(data);
      mutation.mutate(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Form<ServicioDTO> onSubmit={onSubmit}>
          <Titulo>Nuevo Servicio</Titulo>
          <CamposBasicos />

          <Separador />
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
            value="Crear nuevo servicio"
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
              <div>Servicio agregado correctamente</div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default CrearServicio;
