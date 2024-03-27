import { Link } from "react-router-dom";
import { Calendar, Home, Settings, UserCircle } from "solar-icon-set";

const Footer = () => {
  return (
    <div className="flex h-20 items-center justify-around bg-[#FBF5F5]">
      <Link to="/home">
        <Home size={24} color="#1f2937" />
      </Link>
      <Link to="/turnos">
        <Calendar size={24} color="#1f2937" iconStyle="Outline" />
      </Link>
      <Link to="/clientes">
        <UserCircle size={24} color="#1f2937" />
      </Link>
      <Link to="/configuracion">
        <Settings size={24} color="#1f2937" />
      </Link>
    </div>
  );
};

export default Footer;
