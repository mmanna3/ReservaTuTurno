import { ReactNode } from "react";

interface TituloProps {
  children: ReactNode;
}

const Titulo = (props: TituloProps) => {
  return (
    <h2 className="text-negro mb-2 w-full pl-1 text-left text-2xl font-medium">
      {props.children}
    </h2>
  );
};

export default Titulo;
