import { api } from "../../api/api";
import useApiQuery from "../../api/custom-hooks/use-api-query";
import { BotonLink } from "../../ui/boton-link";
import ContenedorCentradoConMargenes from "../../ui/contenedor-centrado-con-imagenes";
import ContenidoConSpinnerYError from "../../ui/contenido-con-spinner-y-error";
import { Subtitulo } from "../../ui/subtitulo";
import Titulo from "../../ui/titulo";
import { ServicioListaItem } from "./componentes/lista-item";

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
