import { FieldValues, useFormContext } from "react-hook-form";

interface IArrayProps {
  index: number;
  parentName: string;
}

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
  array?: IArrayProps;
}

const Input = <T extends FieldValues>({
  required = false,
  ...props
}: InputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  let fieldName = props.name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${props.name as string}`;

  return (
    <div className="group relative z-0 -my-[0.3rem] w-full text-left">
      <label
        htmlFor={fieldName}
        className={`relative left-4 top-[1.8rem] w-auto bg-transparent px-1 text-[12px] text-gris group-focus-within:font-bold group-focus-within:text-verde group-focus-visible:text-verde ${
          errors[fieldName] && "!text-rojo"
        }`}
      >
        {props.label}
      </label>

      <input
        {...props}
        className={`text-10 py-55-rem block h-16 w-full rounded-xl bg-grisclarito p-2.5 pl-5 pt-7 text-base text-negro placeholder-grisclaro !shadow-none focus:!border-verde focus:!outline-verde focus:!ring-verde focus-visible:text-verde focus-visible:!outline-verde ${
          errors[fieldName] &&
          "border-rojo focus:border-rojo focus:ring-rojo focus-visible:outline-rojo"
        }`}
        {...register(fieldName, { required: required })}
      />
      {errors[fieldName] && errors[fieldName]?.type === "required" && (
        <span className="pl-3 text-sm text-rojo">Este campo es requerido</span>
      )}
    </div>
  );
};

export default Input;
