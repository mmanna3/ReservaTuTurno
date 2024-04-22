import { TrashIcon } from "@heroicons/react/24/outline";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FranjaHorariaDTO } from "../../../api/clients";
import FormHiddenInput from "../../../components/FormHiddenInput";
import FormTimePicker from "../../../components/FormTimePicker";

interface IProps {
  parentName: string;
}

export function FranjasHorarias(props: IProps) {
  const { fields, append, remove } = useFieldArray({
    name: `${props.parentName}.franjasHorarias`,
  });

  const { getValues } = useFormContext();

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex w-full gap-2">
          <FormHiddenInput<FranjaHorariaDTO>
            name="agendaId"
            value={
              getValues(`${props.parentName}.id`) != undefined
                ? getValues(`${props.parentName}.id`)
                : 0
            }
            array={{
              index: index,
              parentName: `${props.parentName}.franjasHorarias`,
            }}
          />
          <div className="w-full">
            <FormTimePicker<FranjaHorariaDTO>
              label="Desde"
              name="desde"
              horaDefault="09"
              minutosDefault="00"
              array={{
                index: index,
                parentName: `${props.parentName}.franjasHorarias`,
              }}
            />
          </div>
          <div className="w-full">
            <FormTimePicker<FranjaHorariaDTO>
              label="Hasta"
              name="hasta"
              horaDefault="18"
              minutosDefault="00"
              array={{
                index: index,
                parentName: `${props.parentName}.franjasHorarias`,
              }}
            />
          </div>
          <div className="ml-2 mr-1 mt-8 flex items-center">
            <button onClick={() => remove(index)} type="button">
              <TrashIcon className="h-5 w-5 text-negro" />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => append({})}
        type="button"
        className="mt-4 rounded-xl border border-gris p-2 text-sm text-gris"
      >
        Agregar franja
      </button>
    </>
  );
}
