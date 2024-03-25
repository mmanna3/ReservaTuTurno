import { useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AgendaDTO } from "../../../api/clients";
import FormHiddenInput from "../../../components/FormHiddenInput";
import AgendaServicios from "./AgendaServicios";
import DiasDeLaSemana from "./DiasDeLaSemanaCheckboxs";
import { FranjasHorarias } from "./FranjasHorarias";

const AgendasDelProfesional = () => {
  const { id: profesionalId } = useParams();
  const { fields, append, remove } = useFieldArray({
    name: "agendas",
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="border-b pb-3">
          {
            <>
              <FormHiddenInput<AgendaDTO>
                name="profesionalId"
                value={profesionalId as string}
                array={{ index: index, parentName: "agendas" }}
              />
              <DiasDeLaSemana parentName={`agendas.${index}`} />
              <FranjasHorarias parentName={`agendas.${index}`} />
              <AgendaServicios parentName={`agendas.${index}`} />
            </>
          }
        </div>
      ))}
    </>
  );
};

export default AgendasDelProfesional;
