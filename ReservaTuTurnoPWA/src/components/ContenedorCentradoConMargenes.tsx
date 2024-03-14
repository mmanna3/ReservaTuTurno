import { ReactNode } from "react";

interface ContenedorProps {
  children: ReactNode;
}

const ContenedorCentradoConMargenes = (props: ContenedorProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-12">
      {props.children}
    </div>
  );
};

export default ContenedorCentradoConMargenes;
