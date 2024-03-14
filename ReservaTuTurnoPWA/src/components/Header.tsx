import { useNavigate } from "react-router-dom";
import { AltArrowLeft } from "solar-icon-set";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className="mb-1 grid h-16 content-center pl-10">
      <AltArrowLeft size={24} color="black" onClick={() => navigate(-1)} />
    </div>
  );
}
