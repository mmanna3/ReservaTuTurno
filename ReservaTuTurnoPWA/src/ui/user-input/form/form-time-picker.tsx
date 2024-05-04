import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { getProp } from "../../../utilidades";
import TimePicker, { ITimePicker } from "../time-picker";

interface IArrayProps {
  index: number;
  parentName: string;
}

interface IFormTimePicker<T extends FieldValues>
  extends Omit<ITimePicker, "name" | "hayError" | "valor"> {
  name: keyof T;
  array?: IArrayProps;
}

const FormTimePicker = <T extends FieldValues>(props: IFormTimePicker<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  let fieldName = props.name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${fieldName}`;

  const errorMessage = getProp(errors, fieldName);

  const customOnChange = (x: string) => {
    props.onChange && props.onChange(x);
  };

  return (
    <>
      <Controller
        control={control}
        name={fieldName.toString()}
        rules={{ required: props.required }}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            {...props}
            valor={value}
            hayError={!!errorMessage}
            onChange={(e) => {
              customOnChange(e);
              onChange(e);
            }}
          />
        )}
      />
      {errorMessage && errorMessage?.type === "required" && (
        <span className="pl-3 text-sm text-rojo">Es requerido</span>
      )}
    </>
  );
};

export default FormTimePicker;
