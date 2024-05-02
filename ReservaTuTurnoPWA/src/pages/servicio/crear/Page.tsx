import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import { ServicioDTO, ServiciosDelProfesionalDTO } from "../../../api/clients";
import useApiMutation from "../../../api/custom-hooks/useApiMutation";
import { Separador } from "../../../ui/separator";
import Titulo from "../../../ui/titulo";
import Form from "../../../ui/user-input/form/form";
import { BotonSubmit } from "../../../ui/user-input/form/form-boton-submit";
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

  const mutation = useApiMutation({
    mensajeDeExito: "Servicio creado",
    antesDeMensajeExito: () => navigate(-1),
    fn: async (servicio: ServicioDTO) => {
      if (Array.isArray(servicio.profesionalesQueLoBrindan)) {
        const instancias = servicio.profesionalesQueLoBrindan.map(
          (x) => new ServiciosDelProfesionalDTO(x),
        );
        servicio.profesionalesQueLoBrindan = instancias;
      }

      await api.servicioPOST(servicio);
    },
  });

  const onSubmit: SubmitHandler<ServicioDTO> = (data) => {
    // Manejarlo con el react-hook-form
    if (seRepitenProfesionales(data.profesionalesQueLoBrindan)) {
      setErrorDosProfesionales("Hay profesionales repetidos.");
      return;
    }
    mutation.mutate(data);
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
          <BotonSubmit
            estaDeshabilitado={mutation.isPending}
            texto="Crear nuevo servicio"
          />
        </Form>
      </div>
    </>
  );
};

export default CrearServicio;
