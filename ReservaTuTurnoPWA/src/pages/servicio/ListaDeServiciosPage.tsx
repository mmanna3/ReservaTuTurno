import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Client, ServicioDTO } from "../../api/clients";
import Spinner from "../../components/Spinner";

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
      <h2 className="text-2xl mb-4 mt-16">Servicios</h2>
      <div>
        <button className="bg-pink-500 text-slate-50 w-full h-16 rounded-xl my-6">
          <Link className="text-slate-50 text-lg" to="/servicios/crear">
            Crear
          </Link>
        </button>
      </div>
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
