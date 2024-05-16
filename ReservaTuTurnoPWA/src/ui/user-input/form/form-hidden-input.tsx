import { useEffectOnce } from "@utilidades/useEffectOnce";
import { FieldValues, useFormContext } from "react-hook-form";
import { IFormComponent, obtenerNombreDelCampo } from "./form.utils";

interface InputProps<T extends FieldValues> extends IFormComponent<T> {
  value?: string | number;
}

const FormHiddenInput = <T extends FieldValues>({
  ...props
}: InputProps<T>) => {
  const { register, setValue } = useFormContext();

  const fieldName = obtenerNombreDelCampo<T>(props.name, props.array);
  useEffectOnce(() => {
    if (props.value) setValue(fieldName, props.value);
  });

  return <input type="hidden" {...register(fieldName)} />;
};

export default FormHiddenInput;
