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
        className={`relative left-4 top-[1.8rem] w-auto bg-transparent px-1 text-[12px] text-gray-600 group-focus-within:font-bold group-focus-within:text-[#32BF8D] group-focus-visible:text-[#32BF8D] ${
          errors[props.name as string] && "!text-red-600"
        }`}
      >
        {props.label}
      </label>

      <input
        {...props}
        className={`text-10 py-55-rem block h-16 w-full rounded-xl bg-[#F9F9F9] p-2.5 pl-5 pt-7 text-base text-gray-800 placeholder-gray-400 focus:border-[#32BF8D] focus:outline-[#32BF8D] focus:ring-[#32BF8D] focus-visible:text-[#32BF8D] focus-visible:outline-[#32BF8D] ${
          errors[props.name as string] &&
          "border-red-600 focus:border-red-600 focus:ring-red-600 focus-visible:outline-red-600"
        }`}
        {...register(props.name as string, { required: required })}
      />
      {errors[props.name as string] &&
        errors[props.name]?.type === "required" && (
          <span className="pl-3 text-sm text-red-600">
            Este campo es requerido
          </span>
        )}
    </div>
  );
};

export default Input;
