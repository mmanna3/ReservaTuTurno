import { useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { TrashBinMinimalistic } from "solar-icon-set";
import { FranjaHorariaDTO } from "../../../api/clients";
import FormHiddenInput from "../../../components/FormHiddenInput";
import Input from "../../../components/Input";

export function FranjasHorarias() {
  const { fields, append, remove } = useFieldArray({
    // control, // control props comes from useForm (optional: if you are using FormContext)
    name: "franjasHorarias", // unique name for your Field Array
  });

  const { agendaid } = useParams();

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <FormHiddenInput<FranjaHorariaDTO>
            name="agendaId"
            value={agendaid != undefined ? agendaid : 0}
            array={{
              index: index,
              parentName: "franjasHorarias",
            }}
          />
          <Input<FranjaHorariaDTO>
            label="Desde"
            name="desde"
            type="time"
            array={{
              index: index,
              parentName: "franjasHorarias",
            }}
          />
          <Input<FranjaHorariaDTO>
            label="Hasta"
            name="hasta"
            type="time"
            array={{
              index: index,
              parentName: "franjasHorarias",
            }}
          />
          <div className="ml-2 mr-1 mt-8 flex items-center">
            <button onClick={() => remove(index)} type="button">
              <TrashBinMinimalistic size={22} color="#1f2937" />
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
