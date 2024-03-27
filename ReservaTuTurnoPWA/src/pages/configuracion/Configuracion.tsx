import { Link } from "react-router-dom";
import ContenedorCentradoConMargenes from "../../components/ContenedorCentradoConMargenes";
import { Separador } from "../../components/Separador";
import { Subtitulo } from "../../components/Subtitulo";
import Titulo from "../../components/Titulo";

interface IOpcionesProps {
  link: string;
  titulo: string;
  texto: string;
}

function Opciones(props: IOpcionesProps) {
  return (
    <Link to={props.link} className="mt-1 w-full">
      <Subtitulo>{props.titulo}</Subtitulo>
      <p className="pl-1 text-base">{props.texto}</p>
      <Separador />
    </Link>
  );
}

const Configuracion = () => {
  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Configuración</Titulo>
      <div className="mt-8">
        <Opciones
          link="/servicios"
          titulo="Servicios"
          texto="Creá y modificá servicios y sus profesionales asociados."
        />
        <Opciones
          link="/servicios/categoria/crear"
          titulo="Categorías"
          texto="Creá categorías."
        />
        <Opciones
          link="/profesionales"
          titulo="Profesionales"
          texto="Creá y modificá profesionales y sus agendas."
        />
      </div>
    </ContenedorCentradoConMargenes>
  );
};

export default Configuracion;
