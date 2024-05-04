import cx from "classnames";
import { Icono } from "src/utilidades";

interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "name"
  > {
  name?: string;
  label?: string;
  esRequerido?: boolean;
  hayError?: boolean;
  Icono?: Icono;
}

const Input = (props: InputProps) => {
  const { label, Icono, esRequerido, hayError = false, name, ...rest } = props;

  return (
    <div className="group relative z-0 -my-[0.3rem] w-full text-left">
      <label
        htmlFor={name}
        className={cx(
          hayError && "!text-rojo",
          "relative left-4 top-[1.8rem] w-auto bg-transparent px-1 text-[12px] text-gris group-focus-within:font-bold group-focus-within:text-verde group-focus-visible:text-verde",
        )}
      >
        {label} {esRequerido ? "*" : null}
      </label>

      {Icono && (
        <Icono className="absolute right-4 top-11 h-6 w-6 text-gris group-focus-within:text-verde" />
      )}
      <input
        // Acá filtrar solo las que son props del input
        {...rest}
        onChange={props.onChange}
        data-testid={`input-${name}`}
        className={cx(
          hayError
            ? "border-rojo focus:border-rojo focus:ring-rojo focus-visible:text-rojo focus-visible:outline-rojo"
            : "focus:border-verde focus:outline-verde focus:ring-verde focus-visible:text-verde focus-visible:outline-verde",
          "text-10 py-55-rem block h-16 w-full rounded-xl bg-grisclarito p-2.5 pl-5 pr-11 pt-7 text-base text-negro placeholder-grisclaro !shadow-none",
        )}
      />
    </div>
  );
};

export default Input;
