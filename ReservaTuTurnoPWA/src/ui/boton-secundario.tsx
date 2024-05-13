interface IProps {
  texto: string;
  onClick: () => void;
}

export default function BotonSecundario(props: IProps) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="mt-3 flex rounded-lg bg-grisclarito/20 p-3 px-4 text-base font-medium text-rosa shadow-sm"
    >
      {props.texto}
    </button>
  );
}
