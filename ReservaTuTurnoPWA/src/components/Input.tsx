interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "name"
  > {
  name: string;
  label?: string;
  esRequerido?: boolean;
  hayError: boolean;
}

const Input = (props: InputProps) => {
  return (
    <div className="group relative z-0 -my-[0.3rem] w-full text-left">
      <label
        htmlFor={props.name}
        className={`relative left-4 top-[1.8rem] w-auto bg-transparent px-1 text-[12px] text-gris group-focus-within:font-bold group-focus-within:text-verde group-focus-visible:text-verde ${
          props.hayError && "!text-rojo"
        }`}
      >
        {props.label} {props.esRequerido ? "*" : null}
      </label>

      <input
        {...props}
        className={`text-10 py-55-rem block h-16 w-full rounded-xl bg-grisclarito p-2.5 pl-5 pt-7 text-base text-negro placeholder-grisclaro !shadow-none focus:!border-verde focus:!outline-verde focus:!ring-verde focus-visible:text-verde focus-visible:!outline-verde ${
          props.hayError &&
          "border-rojo focus:border-rojo focus:ring-rojo focus-visible:outline-rojo"
        }`}
      />
    </div>
  );
};

export default Input;
