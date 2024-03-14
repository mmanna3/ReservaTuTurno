import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import ContenedorCentradoConMargenes from "../../components/ContenedorCentradoConMargenes";
import ContenidoConSpinnerYError from "../../components/ContenidoConSpinnerYError";
import Titulo from "../../components/Titulo";

const ListaDeProfesionales = () => {
  const {
    data: profesionales,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profesionales"],
    queryFn: async () => await api.profesionalAll(),
    throwOnError: true,
  });

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Profesionales</Titulo>
      <button className="my-6 h-16 w-full rounded-xl bg-rosa text-slate-50">
        <Link className="text-lg text-slate-50" to="/profesionales/crear">
          Crear
        </Link>
      </button>

      <ContenidoConSpinnerYError
        isLoading={isLoading}
        error={error}
        hasData={profesionales === null ? false : true}
      >
        <div className="h-screen w-full overflow-auto">
          {profesionales?.map((s: ProfesionalDTO) => (
            <div
              key={s.id}
              className="mb-2 w-64 w-full rounded-lg border p-8 text-gris"
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
            </div>
          ))}
        </div>
      </ContenidoConSpinnerYError>
    </ContenedorCentradoConMargenes>
  );
};

export default ListaDeProfesionales;
