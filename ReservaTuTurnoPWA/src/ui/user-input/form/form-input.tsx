import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { getProp } from "../../../utilidades";
import Input, { InputProps } from "../input";
import { IFormComponent, obtenerNombreDelCampo } from "./form.utils";

interface FormInputProps<T extends FieldValues>
  extends IFormComponent<T>,
    Omit<InputProps, "name"> {
  required?: boolean;
}

const FormInput = <T extends FieldValues>({
  required = false,
  name,
  ...props
}: FormInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldName = obtenerNombreDelCampo<T>(name, props.array);
  const errorMessage = getProp(errors, fieldName);

  const customOnChange = (x: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(x);
  };

  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: required }}
        render={({ field: { onChange: hookFormOnChange, value } }) => (
          <Input
            defaultValue={value}
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
