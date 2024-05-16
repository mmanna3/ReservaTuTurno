import { AgendaDTO } from "@api/clients";
import { TrashIcon } from "@heroicons/react/24/outline";
import BotonSecundario from "@ui/boton-secundario";
import FormHiddenInput from "@ui/user-input/form/form-hidden-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import DiasDeLaSemana from "./dias-de-la-semana";
import { FranjasHorarias } from "./franjas-horarias";
import Servicios from "./servicios";

const Lista = () => {
  const { id: profesionalId } = useParams();
  const { fields, append, remove } = useFieldArray({
    name: "agendas",
  });

  const { getValues } = useFormContext();

  return (
    <>
      {fields.map((field, index) => {
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
                <Servicios
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

      <BotonSecundario onClick={() => append({})} texto="Agregar agenda" />
    </>
  );
};

export default Lista;
