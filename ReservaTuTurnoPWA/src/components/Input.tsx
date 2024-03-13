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
        className={`relative left-2 top-[1.6rem] w-auto bg-transparent px-1 text-[12px] text-gray-700 group-focus-within:font-bold group-focus-within:text-[#32BF8D] group-focus-visible:text-[#32BF8D] ${
          errors[props.name as string] && "!text-red-600"
        }`}
      >
        {props.label}
      </label>

      <input
        {...props}
        className={`text-10 py-55-rem text-grey-950 block h-16 w-full rounded-lg border border-gray-300 bg-slate-50 p-2.5 pl-3 pt-5 text-base placeholder-gray-400 focus:border-[#32BF8D] focus:ring-[#32BF8D] focus-visible:text-[#32BF8D] focus-visible:outline-[#32BF8D] ${
          errors[props.name as string] &&
          "border-red-600 focus:border-red-600 focus:ring-red-600 focus-visible:outline-red-600"
        }`}
        {...register(props.name as string, { required: required })}
      />
      {errors[props.name as string] &&
        errors[props.name]?.type === "required" && (
          <span className="text-sm text-red-600">Este campo es requerido</span>
        )}
    </div>
  );
};

export default Input;
