import { FieldValues, useFormContext } from "react-hook-form";
import { IFormComponent } from "./form.utils";

interface InputProps<T extends FieldValues> extends IFormComponent<T> {
  value: string | number;
}

const FormHiddenInput = <T extends FieldValues>({
  ...props
}: InputProps<T>) => {
  const { register, setValue } = useFormContext();

  let fieldName = props.name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${props.name as string}`;

  setValue(fieldName, props.value);

  return <input type="hidden" {...register(fieldName)} />;
};

export default FormHiddenInput;
