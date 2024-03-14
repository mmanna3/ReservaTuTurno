import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import ContenidoConSpinnerYError from "../../components/ContenidoConSpinnerYError";

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
    <>
      <h2 className="mb-4 mt-16 text-2xl">Profesionales</h2>
      <div>
        <button className="bg-rosa my-6 h-16 w-full rounded-xl text-slate-50">
          <Link className="text-lg text-slate-50" to="/profesionales/crear">
            Crear
          </Link>
        </button>
      </div>

      <ContenidoConSpinnerYError
        isLoading={isLoading}
        error={error}
        hasData={profesionales === null ? false : true}
      >
        <div className="h-screen overflow-auto">
          {profesionales?.map((s: ProfesionalDTO) => (
            <div
              key={s.id}
              className="text-gris mb-2 w-64 rounded-lg border p-8"
            >
              <p className="text-negro mb-2 text-left text-base font-semibold">
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
    </>
  );
};

export default ListaDeProfesionales;
