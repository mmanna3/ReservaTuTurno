interface IBotonSubmit {
  texto?: string;
  estaDeshabilitado?: boolean;
}

export function BotonSubmit(props: IBotonSubmit) {
  return (
    <input
      type="submit"
      className="mt-8 w-full rounded-xl bg-rosa py-5 text-slate-50"
      value={props.texto || "Crear"}
      disabled={props.estaDeshabilitado || false}
    />
  );
}
