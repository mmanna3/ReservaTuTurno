import { AgendaDTO } from "@api/clients";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormHiddenInput from "@ui/user-input/form/form-hidden-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import AgendaServicios from "./AgendaServicios";
import DiasDeLaSemana from "./DiasDeLaSemanaCheckboxs";
import { FranjasHorarias } from "./FranjasHorarias";

const AgendasDelProfesional = () => {
  const { id: profesionalId } = useParams();
  const { fields, append, remove } = useFieldArray({
    name: "agendas",
  });

  const { getValues } = useFormContext();

  return (
    <>
      {fields.map((field, index) => {
        console.log("field", field);
        return (
          <div key={field.id} className="mt-5 border-b pb-5">
            {
              <>
                <FormHiddenInput<AgendaDTO>
                  name="profesionalId"
                  value={profesionalId as string}
                  array={{ index: index, parentName: "agendas" }}
                />
                <DiasDeLaSemana parentName={`agendas.${index}`} />
                <FranjasHorarias parentName={`agendas.${index}`} />
                <AgendaServicios
                  parentName={`agendas.${index}`}
                  agendaId={getValues(`agendas.${index}.id`) || 0}
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="mt-4 flex p-2 text-xs text-rosaoscuro underline"
                  >
                    Borrar agenda
                    <span>
                      <TrashIcon className="ml-[3.5px] size-4 stroke-[1.5px] text-rosaoscuro opacity-90 group-focus-within:text-verde" />
                    </span>
                  </button>
                </div>
              </>
            }
          </div>
        );
      })}
      {/* TODO: Sacar este otro botón a un componente propio */}
      <button
        onClick={() => append({})}
        type="button"
        className="mt-3 flex rounded-lg bg-grisclarito/20 p-3 px-4 text-base font-medium text-rosa shadow-sm"
      >
        Agregar agenda
      </button>
    </>
  );
};

export default AgendasDelProfesional;
