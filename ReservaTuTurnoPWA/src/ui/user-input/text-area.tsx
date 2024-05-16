import cx from "classnames";
import { Icono } from "src/utilidades";

export interface TextAreaProps
  extends Omit<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "name"
  > {
  name?: string;
  label?: string;
  esRequerido?: boolean;
  hayError?: boolean;
  Icono?: Icono;
}

const TextArea = (props: TextAreaProps) => {
  const { label, Icono, esRequerido, hayError = false, name, ...rest } = props;

  return (
    <div
      className={cx(
        hayError
          ? "border-rojo focus:border-rojo focus:ring-rojo focus-visible:text-rojo focus-visible:outline-rojo"
          : "focus-within:outline-verde focus:ring-verde focus-within:focus:border-verde focus-visible:text-verde focus-visible:outline-verde",
        "text-10 group z-0 -my-[0.3rem] mt-3 block w-full rounded-xl bg-grisclarito pt-2 text-left text-base text-negro placeholder-grisclaro !shadow-none outline-none",
      )}
    >
      <label
        htmlFor={name}
        className={cx(
          hayError && "!text-rojo",
          "ml-4 w-auto bg-grisclarito bg-transparent px-1 text-[12px] text-gris group-focus-within:font-bold group-focus-within:text-verde group-focus-visible:text-verde",
        )}
      >
        {label} {esRequerido ? "*" : null}
      </label>

      {Icono && (
        <Icono
          className={cx(
            hayError && "!text-rojo",
            "absolute right-5 top-11 h-6 w-6 stroke-[1.8px] text-rosa opacity-90 group-focus-within:text-verde",
          )}
        />
      )}
      <textarea
        {...rest}
        name={name}
        onChange={props.onChange}
        data-testid={`textarea-${name}`}
        className={
          "text-10 block h-24 w-full rounded-xl bg-grisclarito pb-4 pl-5 pr-11 text-base text-negro placeholder-grisclaro !shadow-none outline-none group-focus-within:text-verde group-focus-visible:text-verde"
        }
      />
    </div>
  );
};

export default TextArea;
