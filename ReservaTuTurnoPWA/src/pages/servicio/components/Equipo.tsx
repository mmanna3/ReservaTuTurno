import { useQuery } from "@tanstack/react-query";
import { useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
  ProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "../../../api/clients";
import { Dropdown } from "../../../components/Dropdown";
import FormHiddenInput from "../../../components/FormHiddenInput";
import Input from "../../../components/Input";
import { Subtitulo } from "../../../components/Subtitulo";
import {
  DuracionDelServicioArray,
  IDuracionDelServicio,
  convertirEnOptions,
} from "../../../utils";

const Equipo = () => {
  const { data: profesionales } = useQuery({
    queryKey: ["profesionales"],
    queryFn: async () => await api.profesionalAll(),
    throwOnError: true,
  });

  const { id } = useParams();

  const opcionesProfesionales = convertirEnOptions<ProfesionalDTO>(
    profesionales || [],
    "apellido",
    "id",
  );

  const opcionesDuracion = convertirEnOptions<IDuracionDelServicio>(
    DuracionDelServicioArray,
    "label",
    "value",
  );

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      // control, // control props comes from useForm (optional: if you are using FormContext)
      name: "profesionalesQueLoBrindan", // unique name for your Field Array
    },
  );

  // useEffect(() => {
  //   console.log("longitud", fields.length);
  //   if (fields.length == 0) append({});
  // }, []);

  return (
    <>
      <Subtitulo>Equipo</Subtitulo>

      {fields.map((field, index) => (
        <div key={"equipo-" + index} className="border-b pb-3">
          <FormHiddenInput<ServiciosDelProfesionalDTO>
            key={"servicioId-" + index}
            name="servicioId"
            value={id != undefined ? id : 0}
            array={{
              key: field.id,
              index: index,
              parentName: "profesionalesQueLoBrindan",
            }}
          />
          <Dropdown<ServiciosDelProfesionalDTO>
            key={"profesional-" + index}
            name="profesionalId"
            label="Profesional"
            placeholder="Seleccioná un profesional"
            required
            options={opcionesProfesionales}
            array={{
              key: field.id,
              index: index,
              parentName: "profesionalesQueLoBrindan",
            }}
          />
          <div className="flex gap-2">
            <Input<ServiciosDelProfesionalDTO>
              key={"precio-" + index}
              name="precio"
              label="Precio"
              type="number"
              required
              array={{
                key: field.id,
                index: index,
                parentName: "profesionalesQueLoBrindan",
              }}
            />
            <Dropdown<ServiciosDelProfesionalDTO>
              key={"duracion-" + index}
              name="duracionDelTurnoEnMinutos"
              label="Duración"
              placeholder=""
              options={opcionesDuracion}
              required
              array={{
                key: field.id,
                index: index,
                parentName: "profesionalesQueLoBrindan",
              }}
            ></Dropdown>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => remove(index)}
              type="button"
              className="mt-4 rounded-xl border border-gris p-2 text-xs text-gris"
            >
              Quitar profesional
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => append({})}
        type="button"
        className="mt-4 rounded-xl border border-gris p-2 text-sm text-gris"
      >
        Agregar profesional
      </button>
    </>
  );
};

export default Equipo;
