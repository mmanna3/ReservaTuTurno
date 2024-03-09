import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reservá tu turno</h1>
      <div>
        <Link className="text-slate-50 text-lg" to="/servicios">
          <button className="bg-pink-500 text-slate-50 w-64 h-24 rounded-xl mt-2">
            Servicios
          </button>
        </Link>
      </div>
      <div>
        <Link className="text-slate-50 text-lg" to="/profesionales">
          <button className="bg-pink-500 text-slate-50 w-64 h-24 rounded-xl mt-8">
            Profesionales
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
