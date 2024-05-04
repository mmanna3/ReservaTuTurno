import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { getProp } from "../../../utilidades";
import Input from "../input";

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

const FormInput = <T extends FieldValues>({
  required = false,
  name,
  ...props
}: InputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  let fieldName = name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${fieldName}`;

  const errorMessage = getProp(errors, fieldName);

  const customOnChange = (x: any) => {
    props.onChange && props.onChange(x);
  };

  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: required }}
        render={({ field: { onChange: hookFormOnChange } }) => (
          <Input
            name={fieldName}
            hayError={!!errorMessage}
            esRequerido={required}
            label={props.label}
            onChange={(e) => {
              customOnChange(e);
              hookFormOnChange(e);
            }}
            {...props}
          />
        )}
      />
      {errorMessage && errorMessage?.type === "required" && (
        <div className="pl-3 pt-1 text-sm text-rojo">Es requerido</div>
      )}
    </>
  );
};

export default FormInput;
