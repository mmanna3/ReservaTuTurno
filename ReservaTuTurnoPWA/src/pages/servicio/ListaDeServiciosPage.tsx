import { api } from "../../api/api";
import useApiQuery from "../../api/custom-hooks/useApiQuery";
import { BotonLink } from "../../components/BotonLink";
import ContenedorCentradoConMargenes from "../../components/ContenedorCentradoConMargenes";
import ContenidoConSpinnerYError from "../../components/ContenidoConSpinnerYError";
import { Subtitulo } from "../../components/Subtitulo";
import Titulo from "../../components/Titulo";
import { ServicioListaItem } from "./ServicioListaItem";

const ListaDeServicios = () => {
  const {
    data: categorias,
    error,
    isFetching,
    isLoading,
  } = useApiQuery({
    key: ["servicios-por-categoria"],
    fn: async () => await api.categoriaDeServicioAll(),
  });

  // useEffect(() => {
  //   refetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Servicios</Titulo>

      <ContenidoConSpinnerYError
        isLoading={isFetching || isLoading}
        error={error}
        hasData={categorias === null ? false : true}
        mensajeSpinner="Buscando tus servicios 🕵🏻"
      >
        <BotonLink link="/servicios/crear" texto="Crear" />
        <div className="overflow-autom h-screen w-full">
          {categorias?.map((x) => (
            <div className="mt-8" key={x.id}>
              <Subtitulo>{x.nombre}</Subtitulo>
              {x.servicios && x.servicios.length ? (
                x.servicios.map((s) => (
                  <ServicioListaItem key={s.id} servicio={s} />
                ))
              ) : (
                <p className="pl-1">Esta categoría no tiene servicios.</p>
              )}
            </div>
          ))}
        </div>
      </ContenidoConSpinnerYError>
    </ContenedorCentradoConMargenes>
  );
};

export default ListaDeServicios;
