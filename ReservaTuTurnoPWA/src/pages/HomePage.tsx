import { Link } from "react-router-dom";
import ContenedorCentradoConMargenes from "../components/ContenedorCentradoConMargenes";

const Home = () => {
  return (
    <ContenedorCentradoConMargenes>
      <h1 className="mb-8 text-3xl font-bold">Reservá tu turno</h1>
      <div>
        <Link className="text-lg text-slate-50" to="/servicios">
          <button className="mt-2 h-24 w-64 rounded-xl bg-rosa text-slate-50">
            Servicios
          </button>
        </Link>
      </div>
      <div>
        <Link className="text-lg text-slate-50" to="/profesionales">
          <button className="mt-8 h-24 w-64 rounded-xl bg-rosa text-slate-50">
            Profesionales
          </button>
        </Link>
      </div>
      <div>
        <Link className="text-lg text-slate-50" to="/servicios/categoria/crear">
          <button className="mt-8 h-24 w-64 rounded-xl bg-rosa text-slate-50">
            Crear categoría de servicio
          </button>
        </Link>
      </div>
    </ContenedorCentradoConMargenes>
  );
};

export default Home;
