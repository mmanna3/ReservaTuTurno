import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AgendaDTO } from "../../../api/clients";
import FormHiddenInput from "../../../ui/FormHiddenInput";
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
                    className="mt-4 rounded-xl border border-gris p-2 text-xs text-gris"
                  >
                    Borrar agenda
                  </button>
                </div>
              </>
            }
          </div>
        );
      })}
      <button
        onClick={() => append({})}
        type="button"
        className="mt-4 rounded-xl border border-gris p-2 text-sm text-gris"
      >
        Agregar agenda
      </button>
    </>
  );
};

export default AgendasDelProfesional;
