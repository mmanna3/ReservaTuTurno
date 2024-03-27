import ContenedorCentradoConMargenes from "../components/ContenedorCentradoConMargenes";
import FrambuesaIcono from "./../../public/icono-frambuesa.svg";

const Home = () => {
  return (
    <ContenedorCentradoConMargenes>
      <div className="mt-40 flex h-full flex-col items-center justify-center">
        <img src={FrambuesaIcono} alt="Frambuesa" width="60" height="60" />
        <h1 className="text-rosaoscuro mb-2 mt-4 text-3xl font-bold">
          Frambuesa
        </h1>
        <p className="text-sm">Gestioná tus turnos</p>
      </div>
      {/* <div>
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
      </div> */}
    </ContenedorCentradoConMargenes>
  );
};

export default Home;
