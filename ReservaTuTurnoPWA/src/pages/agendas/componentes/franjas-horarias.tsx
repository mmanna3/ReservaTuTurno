import { FranjaHorariaDTO } from "@api/clients";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormHiddenInput from "@ui/user-input/form/form-hidden-input";
import FormTimePicker from "@ui/user-input/form/form-time-picker";
import { useFieldArray, useFormContext } from "react-hook-form";

interface IProps {
  parentName: string;
}

export function FranjasHorarias(props: IProps) {
  const { fields, append, remove } = useFieldArray({
    name: `${props.parentName}.franjasHorarias`,
  });

  const { getValues } = useFormContext();

  if (fields.length == 0) append({});

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
          <div className="mt-6 flex items-center ">
            <button
              onClick={() => remove(index)}
              type="button"
              className="rounded-lg bg-grisclarito/10 p-3 shadow-sm"
            >
              <TrashIcon className="size-5 stroke-[1.8px] text-grisclaro" />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => append({})}
        type="button"
        className="mt-3 p-2 text-sm text-rosaoscuro underline"
      >
        Agregar franja horaria
      </button>
    </>
  );
}
