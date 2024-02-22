import axios from "axios";
import { useState } from "react";

interface Props {
  onCreate: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CrearServicio = (props: Props) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
//   const [respuesta, setRespuesta] = useState();

    async function postServicio() {
      try {
        if (nombre !== '') {
            const response = await axios.post(API_BASE_URL + "/Servicio", {nombre, descripcion});        
            console.log({nombre,descripcion})
            console.log(response);
            setNombre('');
            setDescripcion('');
            props.onCreate();
        }        
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <>
        <div className="border rounded-lg p-8 mb-2">
            <h2 className="text-2xl mb-4">Nuevo servicio</h2>
            <div className="flex flex-col justify-center items-center">
                <input className="block text-slate-50 shadow appearance-none border rounded w-48 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-2" onChange={(e) => setNombre(e.target.value)} id="nombre" value={nombre} type="text" placeholder="Nombre" />
                <input className="block text-slate-50 shadow appearance-none border rounded w-48 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-2" onChange={(e) => setDescripcion(e.target.value)} id="descripcion" value={descripcion} type="text" placeholder="Descripción" />
                <button className="bg-pink-500 text-slate-50 w-48 mt-2" onClick={postServicio}>Crear</button>
            </div>
        </div>
    </>
  );
};

export default CrearServicio;
