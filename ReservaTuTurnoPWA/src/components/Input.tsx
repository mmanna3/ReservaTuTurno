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
    <div className="relative z-0 px-2 w-full group text-left">
      <label
        htmlFor={props.name as string}
        className={`text-[11px] bg-white left-1 relative px-1 top-2 w-auto group-focus-within:text-blue-500 group-focus-within:font-bold ${
          errors[props.name as string] && "text-red-600"
        }`}
      >
        {props.label}
      </label>
      <input
        {...props}
        className={`h-10 text-10 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 ${
          errors[props.name as string] &&
          "border-red-600 focus:border-red-600 focus:ring-red-600"
        }`}
        {...register(props.name as string, { required: required })}
      />

      {errors[props.name as string] &&
        errors[props.name]?.type === "required" && (
          <span className="text-[11px] text-red-600">
            Este campo es requerido
          </span>
        )}
    </div>
  );
};

export default Input;
