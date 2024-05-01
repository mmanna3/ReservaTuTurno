import { api } from "../../api/api";
import useApiQuery from "../../api/custom-hooks/useApiQuery";
import { BotonLink } from "../../ui/BotonLink";
import ContenedorCentradoConMargenes from "../../ui/ContenedorCentradoConMargenes";
import ContenidoConSpinnerYError from "../../ui/ContenidoConSpinnerYError";
import { Subtitulo } from "../../ui/Subtitulo";
import Titulo from "../../ui/Titulo";
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
