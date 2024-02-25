import { useQuery } from "@tanstack/react-query";
import CrearServicio from "./CrearServicio";
import { Client, ServicioDTO } from "./api/clients";
import Spinner from "./utils/Spinner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const client = new Client(API_BASE_URL);

const ListaDeServicios = () => {
  const {
    data: servicios,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["servicios"],
    queryFn: async () => await client.servicioAll(),
  });

  return (
    <>
      <CrearServicio onCreate={() => null} />
      <h2 className="text-2xl mb-4 mt-16">Servicios</h2>
      {isLoading ? <Spinner tamanio="meh" /> : null}
      {error ? <div>Error: {error.message}</div> : null}

      {servicios
        ? servicios.map((s: ServicioDTO) => (
            <div key={s.id} className="border rounded-lg p-8 mb-2">
              <p className="text-lg font-semibold mb-2">{s.nombre}</p>
              <p>{s.descripcion}</p>
            </div>
          ))
        : null}
    </>
  );
};

export default ListaDeServicios;
