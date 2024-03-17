import { Link } from "react-router-dom";

interface IProps {
  texto: string;
  link: string;
}

export function BotonLink(props: IProps) {
  return (
    <Link
      className="my-6 flex h-16 w-full items-center justify-center rounded-xl bg-rosa text-lg text-blanco"
      to={props.link}
    >
      {props.texto}
    </Link>
  );
}
