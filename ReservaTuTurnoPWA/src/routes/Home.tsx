import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reservá tu turno</h1>
      <div>
        <button className="bg-pink-500 text-slate-50 w-64 h-24 rounded-xl mt-2">
          <Link className="text-slate-50 text-lg" to="/servicios">
            Servicios
          </Link>
        </button>
      </div>
      <div>
        <button className="bg-pink-500 text-slate-50 w-64 h-24 rounded-xl mt-8">
          <Link className="text-slate-50 text-lg" to="/profesionales">
            Profesionales
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
