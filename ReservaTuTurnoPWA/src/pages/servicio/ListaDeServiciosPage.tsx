import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { ServicioDTO } from "../../api/clients";
import ContenedorCentradoConMargenes from "../../components/ContenedorCentradoConMargenes";
import ContenidoConSpinnerYError from "../../components/ContenidoConSpinnerYError";
import Titulo from "../../components/Titulo";

const ListaDeServicios = () => {
  const {
    data: servicios,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["servicios"],
    queryFn: async () => await api.servicioAll(),
    throwOnError: true,
  });

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Servicios</Titulo>
      <div>
        <button className="bg-rosa text-blanco my-6 h-16 w-64 rounded-xl">
          <Link className="text-lg" to="/servicios/crear">
            Crear
          </Link>
        </button>
      </div>

      <ContenidoConSpinnerYError
        isLoading={isLoading}
        error={error}
        hasData={servicios === null ? false : true}
      >
        <div className="h-screen overflow-auto">
          {servicios?.map((s: ServicioDTO) => (
            <div
              key={s.id}
              className="text-gris mb-2 w-full rounded-lg border p-8"
            >
              <p className="text-negro mb-2 text-left text-base font-semibold">
                {s.nombre}
              </p>
              <p className="text-left text-sm">{s.descripcion}</p>
              <div className="mt-5 flex w-full justify-between text-sm">
                <p>{s.precioPorDefecto}$</p>
                <p>{s.duracionDelTurnoPorDefectoEnMinutos}min</p>
              </div>
            </div>
          ))}
        </div>
      </ContenidoConSpinnerYError>
    </ContenedorCentradoConMargenes>
  );
};

export default ListaDeServicios;
