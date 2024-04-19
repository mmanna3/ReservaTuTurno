import Cargando from "./../assets/cargando.svg";

interface SpinnerProps {
  mensaje: string;
}

const Spinner = (props: SpinnerProps) => {
  return (
    <div className="mb-20 flex h-full flex-col items-center justify-center">
      <img src={Cargando} alt="cargando" width="90" height="90" />
      <p className="animate-pulse text-base text-rosa ">{props.mensaje}</p>
    </div>
  );
};

export default Spinner;
