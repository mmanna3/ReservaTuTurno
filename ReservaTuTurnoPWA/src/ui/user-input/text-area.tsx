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
    <div className="group relative z-0 -my-[0.3rem] w-full text-left">
      <label
        htmlFor={name}
        className={cx(
          hayError && "!text-rojo",
          "relative left-4 top-[1.8rem] w-auto bg-grisclarito bg-transparent px-1 text-[12px] text-gris group-focus-within:font-bold group-focus-within:text-verde group-focus-visible:text-verde",
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
        className={cx(
          hayError
            ? "border-rojo focus:border-rojo focus:ring-rojo focus-visible:text-rojo focus-visible:outline-rojo"
            : "focus:border-verde focus:outline-verde focus:ring-verde focus-visible:text-verde focus-visible:outline-verde",
          "text-10 block h-24 w-full rounded-xl bg-grisclarito p-2.5 pl-5 pr-11 pt-7 text-base text-negro placeholder-grisclaro !shadow-none outline-none",
        )}
      />
    </div>
  );
};

export default TextArea;
