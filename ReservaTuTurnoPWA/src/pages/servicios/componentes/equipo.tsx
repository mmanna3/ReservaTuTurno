import { TrashIcon } from "@heroicons/react/24/outline";
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
import { convertirEnOpciones } from "../../../utilidades";

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

  // const opcionesDuracion = convertirEnOpciones<IDuracionDelServicio>(
  //   DuracionDelServicioArray,
  //   "label",
  //   "value",
  // );

  const { fields, append, remove } = useFieldArray({
    name: "profesionalesQueLoBrindan",
  });

  return (
    <>
      <Subtitulo>Equipo</Subtitulo>

      {fields.map((field, index) => (
        <div key={field.id} className="flex w-full gap-2">
          <FormHiddenInput<ServiciosDelProfesionalDTO>
            name="servicioId"
            value={id != undefined ? id : 0}
            array={{
              index: index,
              parentName: "profesionalesQueLoBrindan",
            }}
          />
          <div className="flex-grow">
            <FormAutocomplete<ServiciosDelProfesionalDTO>
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
          </div>
          {/* <div className="flex w-full gap-2">
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
          </div> */}
          <div className="mt-6 flex items-center">
            <button
              onClick={() => remove(index)}
              type="button"
              className="rounded-lg bg-grisclarito/10 p-3 shadow-sm"
            >
              <TrashIcon className="size-5 stroke-[1.8px] text-grisclaro" />
            </button>
          </div>
        </div>
      ))}
      <BotonSecundario texto="Agregar profesional" onClick={() => append({})} />
    </>
  );
};

export default Equipo;
