import { FieldValues, useFormContext } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: keyof T;
  placeholder: string;
  required?: boolean;
}

const Input = <T,>({ required = false, ...props }: InputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <input
        className="block text-slate-50 shadow appearance-none border rounded w-48 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-2"
        placeholder={props.placeholder}
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
