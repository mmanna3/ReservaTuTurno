interface IBotonSubmit {
  texto?: string;
  estaDeshabilitado: boolean;
}

export function BotonSubmit(props: IBotonSubmit) {
  return (
    <input
      type="submit"
      className="mt-8 w-full cursor-pointer rounded-xl bg-rosa py-5 text-lg font-medium tracking-wider text-blanco shadow-lg disabled:bg-grisclaro"
      value={props.texto || "Crear"}
      disabled={props.estaDeshabilitado}
    />
  );
}
