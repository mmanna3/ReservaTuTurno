import { useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
  ProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "../../../api/clients";
import useApiQuery from "../../../api/custom-hooks/useApiQuery";
import { Dropdown } from "../../../components/Dropdown";
import FormHiddenInput from "../../../components/FormHiddenInput";
import FormInput from "../../../components/FormInput";
import { Subtitulo } from "../../../components/Subtitulo";
import {
  DuracionDelServicioArray,
  IDuracionDelServicio,
  convertirEnOptions,
} from "../../../utils";

const Equipo = () => {
  const { data: profesionales } = useApiQuery({
    key: ["profesionales"],
    fn: async () => await api.profesionalAll(),
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

  const { fields, append, remove } = useFieldArray({
    name: "profesionalesQueLoBrindan",
  });

  return (
    <>
      <Subtitulo>Equipo</Subtitulo>

      {fields.map((field, index) => (
        <div key={field.id} className="border-b pb-3">
          <FormHiddenInput<ServiciosDelProfesionalDTO>
            name="servicioId"
            value={id != undefined ? id : 0}
            array={{
              index: index,
              parentName: "profesionalesQueLoBrindan",
            }}
          />
          <Dropdown<ServiciosDelProfesionalDTO>
            name="profesionalId"
            label="Profesional"
            placeholder="Seleccioná un profesional"
            required
            options={opcionesProfesionales}
            array={{
              index: index,
              parentName: "profesionalesQueLoBrindan",
            }}
          />
          <div className="flex gap-2">
            <FormInput<ServiciosDelProfesionalDTO>
              name="precio"
              label="Precio"
              type="number"
              required
              array={{
                index: index,
                parentName: "profesionalesQueLoBrindan",
              }}
            />
            <Dropdown<ServiciosDelProfesionalDTO>
              name="duracionDelTurnoEnMinutos"
              label="Duración"
              placeholder=""
              options={opcionesDuracion}
              required
              array={{
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
