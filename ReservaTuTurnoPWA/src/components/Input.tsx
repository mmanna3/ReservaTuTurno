import { BeakerIcon } from "@heroicons/react/16/solid";
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
    <div className="relative z-0 w-full group text-left">
      <label
        htmlFor={props.name as string}
        className={`text-[12px] bg-transparent text-gray-700 left-3 relative px-1 top-[3rem] w-auto group-focus-within:text-[#32BF8D] group-focus-visible:text-[#32BF8D] group-focus-within:font-bold ${
          errors[props.name as string] && "text-red-600"
        }`}
      >
        {props.label}
      </label>
      <span>
        <BeakerIcon className="relative top-12 h-6 w-6 text-gray-400" />
        <input
          {...props}
          className={`bg-slate-50 pt-5 pl-11 h-16 text-10 border py-55-rem border-gray-300 text-grey-950 text-base rounded-lg focus:ring-[#32BF8D] focus-visible:text-[#32BF8D] focus-visible:text-[#32BF8D] focus:border-[#32BF8D] block w-full p-2.5 placeholder-gray-400 ${
            errors[props.name as string] &&
            "border-red-600 focus:border-red-600 focus:ring-red-600"
          }`}
          {...register(props.name as string, { required: required })}
        />
      </span>

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
