import { Link } from "react-router-dom";
import { Calendar, Home, Settings, UserCircle } from "solar-icon-set";

const Footer = () => {
  return (
    <div className="flex h-20 items-center justify-around bg-[#F9F9F9]">
      <Link to="/home">
        <Home size={24} color="#1f2937" />
      </Link>
      <Calendar size={24} color="#1f2937" iconStyle="Outline" />
      <UserCircle size={24} color="#1f2937" />
      <Link to="/servicios">
        <Settings size={24} color="#1f2937" />
      </Link>
    </div>
  );
};

export default Footer;
