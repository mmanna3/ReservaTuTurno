import { Link } from "react-router-dom";
// import { UserPlus } from "solar-icon-set";
import { ServicioDTO } from "../../api/clients";

interface IProps {
  servicio: ServicioDTO;
}

export function ServicioListaItem(props: IProps) {
  const servicio = props.servicio;

  return (
    <Link to={`/servicios/${servicio.id}/editar`}>
      <div className="mb-2 w-full rounded-lg border p-8 text-gris">
        <p className="mb-2 text-left text-base font-semibold text-negro">
          {servicio.nombre}
        </p>
        <p className="text-left text-sm">{servicio.descripcion}</p>
        <div className="mt-5 flex w-full justify-between text-sm">
          <p>{servicio.precioPorDefecto}$</p>
          <p>{servicio.duracionDelTurnoPorDefectoEnMinutos}min</p>
        </div>
        {/* <div className="mt-3 flex justify-end">
          <Link to={`/servicios/${servicio.id}/agregarprofesionales`}>
            <UserPlus size={20} color="#1f2937" />
          </Link>
        </div> */}
      </div>
    </Link>
  );
}
