import { useFieldArray } from "react-hook-form";
import { ServiciosDelProfesionalDTO } from "../../../api/clients";
import FormHiddenInput from "../../../components/FormHiddenInput";

const AgendaServicios = () => {
  const { fields } = useFieldArray({
    name: "servicios",
  });
  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border-b pb-3">
          <FormHiddenInput<ServiciosDelProfesionalDTO>
            name="servicioId"
            value="1"
            array={{
              index: index,
              parentName: "servicios",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AgendaServicios;
