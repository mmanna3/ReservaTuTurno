import { useSearchParams } from "react-router-dom";
import { api } from "../../api/api";
import { TurnoDTO } from "../../api/clients";
import useApiQuery from "../../api/custom-hooks/useApiQuery";
import { BotonLink } from "../../components/BotonLink";
import ContenedorCentradoConMargenes from "../../components/ContenedorCentradoConMargenes";
import ContenidoConSpinnerYError from "../../components/ContenidoConSpinnerYError";
import Titulo from "../../components/Titulo";

const ListaDeTurnosPage = () => {
  const [searchParams] = useSearchParams();

  const {
    data: turnos,
    error,
    isLoading,
  } = useApiQuery({
    key: ["turnos", searchParams.get("refreshToken")],
    fn: async () => await api.turnoAll(),
  });

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Turnos</Titulo>

      <ContenidoConSpinnerYError
        isLoading={isLoading}
        error={error}
        hasData={turnos === null ? false : true}
        mensajeSpinner="Buscando próximos turnos 🕵🏻"
      >
        <BotonLink texto="Crear" link="/turnos/crear" />
        <div className="h-screen w-full overflow-auto">
          {turnos?.map((t: TurnoDTO) => (
            <div
              key={t.id}
              className="mb-2 w-full rounded-lg border border-gray-300 p-8 text-gris"
            >
              <p className="mb-2 text-left text-base font-semibold text-negro">
                {t.fecha} {t.hora}
              </p>
              <div className="mt-5 flex w-full justify-between text-sm">
                <p>{t.servicio}</p>
              </div>
              <div className="mt-5 flex w-full justify-between text-sm">
                <p>
                  <p>{t.profesional}</p>
                </p>
              </div>
            </div>
          ))}
        </div>
      </ContenidoConSpinnerYError>
    </ContenedorCentradoConMargenes>
  );
};

export default ListaDeTurnosPage;
