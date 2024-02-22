import axios from "axios";
import { useEffect, useState } from "react";

const ListaDeServicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    async function getServicios() {
      try {
        const response = await axios.get("http://localhost:5072/api/Servicio");
        setServicios(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getServicios();
  }, []);

  return (
    <>
      <h2 className="text-2xl mb-4">Servicios</h2>
      {servicios.map((s) => (
        <div key={s.id} className="border rounded-lg p-8 mb-2">
          <p className="text-lg font-semibold mb-2">{s.nombre}</p>
          <p>{s.descripcion}</p>
        </div>
      ))}
    </>
  );
};

export default ListaDeServicios;
