import { HomeIcon, CalendarIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex h-20 items-center justify-around bg-[#FBF5F5]">
      <Link to="/home">
        <HomeIcon className="h-6 w-6 text-negro" />
      </Link>
      <Link to="/turnos">
        <CalendarIcon className="h-6 w-6 text-negro" />
      </Link>
      <Link to="/clientes">
        <UserCircleIcon className="h-6 w-6 text-negro" />
      </Link>
      <Link to="/configuracion">
        <Cog6ToothIcon className="h-6 w-6 text-negro" />
      </Link>
    </div>
  );
};

export default Footer;
