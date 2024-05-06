import { ReactNode } from "react";

interface TituloProps {
  children: ReactNode;
}

const Titulo = (props: TituloProps) => {
  return (
    <h2 className="mb-2 w-full pl-1 text-left text-2xl font-medium text-negro">
      {props.children}
    </h2>
  );
};

export default Titulo;
