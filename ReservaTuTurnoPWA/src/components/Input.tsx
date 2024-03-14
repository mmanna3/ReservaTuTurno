import { FieldValues, useFormContext } from "react-hook-form";

interface InputProps<T extends FieldValues>
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "name"
  > {
  name: keyof T;
  label?: string;
  required?: boolean;
}

const Input = <T extends FieldValues>({
  required = false,
  ...props
}: InputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="group relative z-0 -my-[0.3rem] w-full text-left">
      <label
        htmlFor={props.name as string}
        className={`group-focus-within:text-verde group-focus-visible:text-verde text-gris relative left-4 top-[1.8rem] w-auto bg-transparent px-1 text-[12px] group-focus-within:font-bold ${
          errors[props.name as string] && "!text-rojo"
        }`}
      >
        {props.label}
      </label>

      <input
        {...props}
        className={`text-10 py-55-rem bg-grisclarito focus:border-verde focus:outline-verde focus:ring-verde focus-visible:text-verde focus-visible:outline-verde text-negro placeholder-grisclaro block h-16 w-full rounded-xl p-2.5 pl-5 pt-7 text-base shadow-none ${
          errors[props.name as string] &&
          "border-rojo focus:border-rojo focus:ring-rojo focus-visible:outline-rojo"
        }`}
        {...register(props.name as string, { required: required })}
      />
      {errors[props.name as string] &&
        errors[props.name]?.type === "required" && (
          <span className="text-rojo pl-3 text-sm">
            Este campo es requerido
          </span>
        )}
    </div>
  );
};

export default Input;
