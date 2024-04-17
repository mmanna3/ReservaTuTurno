import { HomeIcon, CalendarIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface FooterItemProps {
  linkTo: string;
  icono: string;  
}

const iconos: Record<string, React.FC> = {
  home: HomeIcon,  
  turnos: CalendarIcon,
  clientes: UserCircleIcon,
  config: Cog6ToothIcon,
};

const FooterItem = (props: FooterItemProps) => {  

  const Icono = iconos[props.icono] as unknown as React.FC<{ className: string }>;
  
  return (
    <Link to={props.linkTo} className="w-full h-full flex items-center justify-center">
        <Icono className="h-6 w-6 text-negro" />
      </Link>
  )
}

const Footer = () => {
  return (
    <div className="flex h-20 items-center bg-[#FBF5F5]">
      <FooterItem linkTo="/home" icono="home" />
      <FooterItem linkTo="/turnos" icono="turnos" />
      <FooterItem linkTo="/clientes" icono="clientes" />
      <FooterItem linkTo="/configuracion" icono="config" />
    </div>
  );
};

export default Footer;
