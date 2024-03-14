import * as SolarIconSet from "solar-icon-set";

const Footer = () => {
  return (
    <div className="flex h-20 items-center justify-around bg-[#F9F9F9]">
      <SolarIconSet.Home size={24} color="black" />
      <SolarIconSet.Calendar size={24} color="black" iconStyle="Outline" />
      <SolarIconSet.UserCircle size={24} color="black" />
      <SolarIconSet.Settings size={24} color="black" />
    </div>
  );
};

export default Footer;
