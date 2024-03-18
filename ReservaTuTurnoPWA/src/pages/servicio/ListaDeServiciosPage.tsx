import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "../../api/api";
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
    refetch,
  } = useQuery({
    notifyOnChangeProps: "all",
    queryKey: ["servicios"],
    queryFn: async () => await api.categoriaDeServicioAll(),
    throwOnError: true,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Servicios</Titulo>

      <BotonLink link="/servicios/crear" texto="Crear" />

      <ContenidoConSpinnerYError
        isLoading={isFetching || isLoading}
        error={error}
        hasData={categorias === null ? false : true}
      >
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
