import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { getProp } from "../../../utilidades";
import TextArea, { TextAreaProps } from "../text-area";
import { IFormComponent, obtenerNombreDelCampo } from "./form.utils";

interface FormTextAreaProps<T extends FieldValues>
  extends IFormComponent<T>,
    Omit<TextAreaProps, "name"> {
  required?: boolean;
}

const FormTextArea = <T extends FieldValues>({
  required = false,
  name,
  ...props
}: FormTextAreaProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldName = obtenerNombreDelCampo<T>(name, props.array);
  const errorMessage = getProp(errors, fieldName);

  const customOnChange = (x: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange && props.onChange(x);
  };

  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: required }}
        render={({ field: { onChange: hookFormOnChange, value } }) => (
          <TextArea
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

export default FormTextArea;
