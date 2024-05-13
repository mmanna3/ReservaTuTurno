import { UserIcon } from "@heroicons/react/24/outline";
import BotonSecundario from "@ui/boton-secundario";
import FormAutocomplete from "@ui/user-input/form/form-autocomplete";
import { useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
  ProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "../../../api/clients";
import useApiQuery from "../../../api/custom-hooks/use-api-query";
import { Subtitulo } from "../../../ui/subtitulo";
import FormHiddenInput from "../../../ui/user-input/form/form-hidden-input";
import FormInput from "../../../ui/user-input/form/form-input";
import {
  DuracionDelServicioArray,
  IDuracionDelServicio,
  convertirEnOpciones,
} from "../../../utilidades";

const Equipo = () => {
  const { data: profesionales } = useApiQuery({
    key: ["profesionales"],
    fn: async () => await api.profesionalAll(),
  });

  const { id } = useParams();

  const opcionesProfesionales = convertirEnOpciones<ProfesionalDTO>(
    profesionales || [],
    "apellido",
    "id",
  );

  const opcionesDuracion = convertirEnOpciones<IDuracionDelServicio>(
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
          <FormAutocomplete<ServiciosDelProfesionalDTO>
            Icono={UserIcon}
            name="profesionalId"
            label="Profesional"
            placeholder="Seleccioná un profesional"
            required
            opciones={opcionesProfesionales}
            array={{
              index: index,
              parentName: "profesionalesQueLoBrindan",
            }}
          />
          <div className="flex w-full gap-2">
            <div className="w-full">
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
            </div>
            <div className="w-full">
              <FormAutocomplete<ServiciosDelProfesionalDTO>
                name="duracionDelTurnoEnMinutos"
                label="Duración"
                placeholder=""
                opciones={opcionesDuracion}
                required
                array={{
                  index: index,
                  parentName: "profesionalesQueLoBrindan",
                }}
              ></FormAutocomplete>
            </div>
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
      <BotonSecundario texto="Agregar profesional" onClick={() => append({})} />
    </>
  );
};

export default Equipo;
