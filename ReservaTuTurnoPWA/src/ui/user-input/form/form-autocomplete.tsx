import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { getProp } from "../../../utilidades";
import Autocomplete, { IAutocompleteProps } from "../autocomplete";
import { IFormComponent, obtenerNombreDelCampo } from "./form.utils";

interface IFormAutocomplete<T extends FieldValues>
  extends IFormComponent<T>,
    Omit<IAutocompleteProps, "name" | "hayError" | "valor"> {}

const FormAutocomplete = <T extends FieldValues>(
  props: IFormAutocomplete<T>,
) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldName = obtenerNombreDelCampo<T>(props.name, props.array);
  const errorMessage = getProp(errors, fieldName);
  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: props.required }}
        render={({ field: { onChange: ReactHookFormOnChange, value } }) => (
          <Autocomplete
            {...props}
            valorDefault={props.opciones.find((x) => x.id == value)}
            hayError={!!errorMessage}
            onOpcionSeleccionada={(opcion) => {
              props.onOpcionSeleccionada && props.onOpcionSeleccionada(opcion);
              ReactHookFormOnChange(opcion.id);
            }}
            onLimpiar={() => {
              props.onLimpiar && props.onLimpiar();
              ReactHookFormOnChange(null);
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
