import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { getProp } from "../../../utilidades";
import Autocomplete, { IAutocompleteProps, Opcion } from "../autocomplete";

interface IArrayProps {
  index: number;
  parentName: string;
}

interface IFormAutocomplete<T extends FieldValues>
  extends Omit<IAutocompleteProps, "name" | "hayError" | "valor"> {
  name: keyof T;
  array?: IArrayProps;
}

const FormAutocomplete = <T extends FieldValues>(
  props: IFormAutocomplete<T>,
) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  let fieldName = props.name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${fieldName}`;

  const errorMessage = getProp(errors, fieldName);

  const customOnChange = (x: Opcion) => {
    props.onChange && props.onChange(x);
  };

  // En useCallback porque como las opciones se levanta de forma asíncrona,
  // renderiza el componente Autocomplete con valorDefault en undefined
  // const getValorDefault = useCallback(
  //   (value: string) => {
  //     console.log("usecallback");
  //     return;
  //   },
  //   [props.opciones],
  // );

  return (
    <>
      <Controller
        control={control}
        name={fieldName.toString()}
        rules={{ required: props.required }}
        render={({ field: { onChange: ReactHookFormOnChange, value } }) => (
          <Autocomplete
            {...props}
            valorDefault={props.opciones.find((x) => x.id == value)}
            hayError={!!errorMessage}
            onChange={(opcion) => {
              console.log("opcion onchange", opcion);
              customOnChange(opcion);
              ReactHookFormOnChange(opcion.id);
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

export default FormAutocomplete;
