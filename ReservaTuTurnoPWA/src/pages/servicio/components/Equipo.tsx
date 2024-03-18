import { useFieldArray } from "react-hook-form";
import { ServiciosDelProfesionalDTO } from "../../../api/clients";
import Input from "../../../components/Input";
import { Subtitulo } from "../../../components/Subtitulo";

const Equipo = () => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      // control, // control props comes from useForm (optional: if you are using FormContext)
      name: "profesionalesQueLoBrindan", // unique name for your Field Array
    },
  );

  if (fields.length == 0) append({});

  return (
    <>
      <Subtitulo>Equipo</Subtitulo>

      {fields.map((field, index) => (
        <>
          {/* <Dropdown<ServiciosDelProfesionalDTO>
            name="profesionalId"
            label="Profesional"
            required
            options={[]}
          /> */}
          <Input<ServiciosDelProfesionalDTO>
            key={index}
            name="precio"
            label="Precio"
            required
            array={{
              key: field.id,
              index: index,
              parentName: "profesionalesQueLoBrindan",
            }}
          />
        </>
      ))}

      <button className="rounded-xl border border-gris p-2 text-sm text-gris">
        Agregar profesional
      </button>
    </>
  );
};

export default Equipo;
