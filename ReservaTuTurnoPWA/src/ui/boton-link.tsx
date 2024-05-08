import { Link } from "react-router-dom";

interface IProps {
  texto: string;
  link: string;
}

export function BotonLink(props: IProps) {
  return (
    <Link
      className="my-6 flex w-full items-center justify-center rounded-xl bg-rosa py-5 text-lg tracking-wider text-blanco shadow-lg"
      to={props.link}
    >
      {props.texto}
    </Link>
  );
}
