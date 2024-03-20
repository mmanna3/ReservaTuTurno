import { FieldValues, useFormContext } from "react-hook-form";

interface IArrayProps {
  index: number;
  parentName: string;
}

interface InputProps<T extends FieldValues> {
  name: keyof T;
  value: string | number;
  array?: IArrayProps;
}

const FormHiddenInput = <T extends FieldValues>({
  ...props
}: InputProps<T>) => {
  const { register } = useFormContext();

  let fieldName = props.name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${props.name as string}`;

  return <input value={props.value} type="hidden" {...register(fieldName)} />;
};

export default FormHiddenInput;
