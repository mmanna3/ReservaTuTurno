import { useEffect, useState } from "react";
import CrearServicio from "./CrearServicio";
import { ServicioDTO, Client } from "./api/clients";

// import { ServicioDTO } from "./dtos/servicioDTO";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ListaDeServicios = () => {
  const [servicios, setServicios] = useState<ServicioDTO[]>([]);
  const [recargar, setRecargar] = useState(0);

  useEffect(() => {
    async function getServicios() {
      try {
        // const response = await axios.get(API_BASE_URL + "/Servicio");
        const client = new Client(API_BASE_URL);
        const response = await client.servicioAll();
        setServicios(response);
      } catch (error) {
        console.error(error);
      }
    }
    
    getServicios();
  }, [recargar]);

  return (
    <>      
      <CrearServicio onCreate={() => setRecargar(v => v+1)}/>
      <h2 className="text-2xl mb-4 mt-16">Servicios</h2>
      {servicios.map((s: ServicioDTO) => (
        <div key={s.id} className="border rounded-lg p-8 mb-2">
          <p className="text-lg font-semibold mb-2">{s.nombre}</p>
          <p>{s.descripcion}</p>
        </div>
      ))}
    </>
  );
};

export default ListaDeServicios;
