import { CalendarIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import useApiQuery from "../../api/custom-hooks/useApiQuery";
import { BotonLink } from "../../ui/boton-link";
import ContenedorCentradoConMargenes from "../../ui/contenedor-centrado-con-imagenes";
import ContenidoConSpinnerYError from "../../ui/contenido-con-spinner-y-error";
import Titulo from "../../ui/titulo";

const ListaDeProfesionales = () => {
  const [searchParams] = useSearchParams();

  const {
    data: profesionales,
    error,
    isLoading,
  } = useApiQuery({
    key: ["profesionales", searchParams.get("refreshToken")],
    fn: async () => await api.profesionalAll(),
  });

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Profesionales</Titulo>

      <ContenidoConSpinnerYError
        isLoading={isLoading}
        error={error}
        hasData={profesionales === null ? false : true}
        mensajeSpinner="Buscando tus profesionales 🕵🏻"
      >
        <BotonLink texto="Crear" link="/profesionales/crear" />
        <div className="h-screen w-full overflow-auto">
          {profesionales?.map((s: ProfesionalDTO) => (
            <div
              key={s.id}
              className="mb-2 w-full rounded-lg border border-gray-300 p-8 text-gris"
            >
              <p className="mb-2 text-left text-base font-semibold text-negro">
                {s.nombre} {s.apellido}
              </p>
              <div className="mt-5 flex w-full justify-between text-sm">
                <p>{s.email}</p>
              </div>
              <div className="mt-5 flex w-full justify-between text-sm">
                <p>{s.telefono}</p>
              </div>
              <div className="flex justify-end">
                <Link to={`/profesionales/${s.id}/agenda`}>
                  <CalendarIcon className="h-4 w-4 text-gris" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ContenidoConSpinnerYError>
    </ContenedorCentradoConMargenes>
  );
};

export default ListaDeProfesionales;
