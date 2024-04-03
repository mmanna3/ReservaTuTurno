import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className="mb-1 grid h-16 content-center pl-10">
      <ChevronLeftIcon className="h-6 w-6 text-gris" onClick={() => navigate(-1)} />
    </div>
  );
}
