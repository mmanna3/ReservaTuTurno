import ContenedorCentradoConMargenes from "../components/ContenedorCentradoConMargenes";
import FrambuesaIcono from "./../assets/icono-frambuesa.svg";

const Home = () => {
  return (
    <ContenedorCentradoConMargenes>
      <div className="mt-40 flex h-full flex-col items-center justify-center">
        <img src={FrambuesaIcono} alt="Frambuesa" width="60" height="60" />
        <h1 className="text-rosaoscuro mb-2 mt-4 text-3xl font-bold">
          Frambuesa
        </h1>
        <p className="text-sm">Gestioná tus turnos</p>
      </div>
    </ContenedorCentradoConMargenes>
  );
};

export default Home;
