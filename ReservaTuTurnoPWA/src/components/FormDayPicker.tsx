import { format } from "date-fns";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { getProp } from "../utils";
import DayPicker, { IDayPicker } from "./DayPicker";

interface IArrayProps {
  index: number;
  parentName: string;
}

interface IFormDayPicker<T extends FieldValues>
  extends Omit<IDayPicker, "name" | "hayError" | "valor"> {
  name: keyof T;
  array?: IArrayProps;
}

const FormDayPicker = <T extends FieldValues>(props: IFormDayPicker<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  let fieldName = props.name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${fieldName}`;

  const errorMessage = getProp(errors, fieldName);

  const customOnChange = (x: Date) => {
    props.onChange && props.onChange(x);
  };

  return (
    <>
      <Controller
        control={control}
        name={fieldName.toString()}
        rules={{ required: props.required }}
        render={({ field: { onChange, value } }) => (
          <DayPicker
            {...props}
            valor={value}
            diasDisponibles={props.diasDisponibles}
            hayError={!!errorMessage}
            onChange={(e) => {
              customOnChange(e);
              onChange(format(e, "dd-MM-yyyy"));
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

export default FormDayPicker;