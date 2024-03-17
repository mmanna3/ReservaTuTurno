import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export function Subtitulo(props: IProps) {
  return (
    <h3 className="mb-4 w-full pl-1 text-left text-xl font-medium text-negro">
      {props.children}
    </h3>
  );
}
