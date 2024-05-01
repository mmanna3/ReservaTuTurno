import ContenedorCentradoConMargenes from "../../ui/ContenedorCentradoConMargenes";
import Titulo from "../../ui/Titulo";

const ClientesPage = () => {
  return (
    <ContenedorCentradoConMargenes>
      <Titulo>Clientes</Titulo>
      <div className="w-full">
        <p className="mt-2 pl-1 text-base">Acá van a estar los clientes.</p>
      </div>
    </ContenedorCentradoConMargenes>
  );
};

export default ClientesPage;
