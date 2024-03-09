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
      <h2 className="text-2xl mb-4 mt-16">Servicios</h2>
      <div>
        <button className="bg-pink-500 text-slate-50 w-full h-16 rounded-xl my-6">
          <Link className="text-slate-50 text-lg" to="/servicios/crear">
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
              className="border rounded-lg w-64 p-8 mb-2 text-zinc-500"
            >
              <p className="text-left text-base font-semibold mb-2 text-zinc-800">
                {s.nombre} {s.apellido}
              </p>
              <div className="flex text-sm justify-between mt-5 w-full">
                <p>{s.email}</p>
              </div>
              <div className="flex text-sm justify-between mt-5 w-full">
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
