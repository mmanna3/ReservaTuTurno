import { Calendar, Home, Settings, UserCircle } from "solar-icon-set";

const Footer = () => {
  return (
    <div className="flex h-20 items-center justify-around bg-[#F9F9F9]">
      <Home size={24} color="black" />
      <Calendar size={24} color="black" iconStyle="Outline" />
      <UserCircle size={24} color="black" />
      <Settings size={24} color="black" />
    </div>
  );
};

export default Footer;
