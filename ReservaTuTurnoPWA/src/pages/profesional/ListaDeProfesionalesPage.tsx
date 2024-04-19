import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import { BotonLink } from "../../components/BotonLink";
import ContenedorCentradoConMargenes from "../../components/ContenedorCentradoConMargenes";
import ContenidoConSpinnerYError from "../../components/ContenidoConSpinnerYError";
import Titulo from "../../components/Titulo";

const ListaDeProfesionales = () => {
  const [searchParams] = useSearchParams();
  
  const {
    data: profesionales,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profesionales", searchParams.get('refreshToken')],
    queryFn: async () => await api.profesionalAll(),
    throwOnError: true,
  });

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Profesionales</Titulo>
      <BotonLink texto="Crear" link="/profesionales/crear" />

      <ContenidoConSpinnerYError
        isLoading={isLoading}
        error={error}
        hasData={profesionales === null ? false : true}
      >
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
