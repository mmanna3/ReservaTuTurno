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
    <>
      <input
        {...props}
        className="block text-slate-800 shadow appearance-none border rounded w-56 h-12 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-2"
        {...register(props.name as string, { required: required })}
      />
      {errors[props.name as string] &&
        errors[props.name]?.type === "required" && (
          <span>Este campo es requerido</span>
        )}
    </>
  );
};

export default Input;
