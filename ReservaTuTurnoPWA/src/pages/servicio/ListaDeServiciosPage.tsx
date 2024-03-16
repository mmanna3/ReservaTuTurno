import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import ContenedorCentradoConMargenes from "../../components/ContenedorCentradoConMargenes";
import ContenidoConSpinnerYError from "../../components/ContenidoConSpinnerYError";
import { Subtitulo } from "../../components/Subtitulo";
import Titulo from "../../components/Titulo";
import { ServicioListaItem } from "./ServicioListaItem";

const ListaDeServicios = () => {
  const {
    data: categorias,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["servicios"],
    queryFn: async () => await api.categoriaDeServicioAll(),
    throwOnError: true,
  });

  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Servicios</Titulo>

      <button className="my-6 h-16 w-full rounded-xl bg-rosa text-blanco">
        <Link className="text-lg" to="/servicios/crear">
          Crear
        </Link>
      </button>

      <ContenidoConSpinnerYError
        isLoading={isLoading}
        error={error}
        hasData={categorias === null ? false : true}
      >
        <div className="overflow-autom h-screen w-full">
          {categorias?.map((x) => (
            <div className="mt-5" key={x.id}>
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
