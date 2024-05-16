import { api } from "@api/api";
import {
  AgendaServicioProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "@api/clients";
import useApiQuery from "@api/custom-hooks/use-api-query";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ContenidoConSpinnerYError from "@ui/contenido-con-spinner-y-error";
import { Opcion } from "@ui/user-input/autocomplete";
import FormAutocomplete from "@ui/user-input/form/form-autocomplete";
import FormHiddenInput from "@ui/user-input/form/form-hidden-input";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { convertirEnOpciones } from "../../../utilidades";

interface IProps {
  parentName: string;
  agendaId: number | null;
}

const Servicios = (props: IProps) => {
  const { id: profesionalId } = useParams();

  const {
    data: servicios,
    error,
    isFetching,
    isLoading,
    isError,
  } = useApiQuery({
    key: ["servicios-del-profesional"],
    fn: async () => await api.servicios(Number(profesionalId)),
  });

  useEffect(() => {
    if (!isLoading && !isError && servicios) {
      setTodosLosServiciosDelProfesional(servicios);
    }
  }, [servicios, isLoading, isError]);

  const [todosLosServiciosDelProfesional, setTodosLosServiciosDelProfesional] =
    useState<ServiciosDelProfesionalDTO[]>([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState<Opcion[]>(
    [],
  );

  const parentName = `${props.parentName}.servicios`;

  const { fields, append, remove } = useFieldArray({
    name: parentName,
  });

  useEffect(() => {
    const nombresDeServciosYaAgregados = fields.map(
      (x) =>
        (x as unknown as AgendaServicioProfesionalDTO).servicioProfesional
          ?.servicioNombre,
    );

    const todosSinLosYaAgregados = todosLosServiciosDelProfesional.filter(
      (x) => !nombresDeServciosYaAgregados.includes(x.servicioNombre),
    );

    const opciones = convertirEnOpciones<ServiciosDelProfesionalDTO>(
      todosSinLosYaAgregados || [],
      "servicioNombre",
      "id",
    );

    setServiciosDisponibles(opciones);
  }, [fields, todosLosServiciosDelProfesional]);

  const onAgregarServicio = (servicioOption: Opcion) => {
    const servicio = todosLosServiciosDelProfesional.find(
      (x) => x.servicioNombre === servicioOption.valor,
    );

    append({
      id: 0,
      agendaId: props.agendaId,
      servicioProfesionalId: servicio?.id,
      servicioProfesional: {
        id: servicio?.id,
        servicioNombre: servicio?.servicioNombre,
      },
    } as AgendaServicioProfesionalDTO);
  };

  const quitarServicio = ({
    index,
  }: {
    label: string;
    index: number;
  }): void => {
    remove(index);
  };

  return (
    <ContenidoConSpinnerYError
      isLoading={isFetching || isLoading}
      error={error}
      hasData={servicios === null ? false : true}
      mensajeSpinner="Cargando agendas 🗓️"
    >
      <FormAutocomplete<ServiciosDelProfesionalDTO>
        name="servicioNombre"
        label="Servicios"
        placeholder="Elegí un servicio"
        opciones={serviciosDisponibles}
        onChange={onAgregarServicio}
      />
      <div className="ml-2 mt-3 flex flex-wrap gap-2">
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <button
                className="flex rounded-xl border p-1 text-sm text-grisclaro"
                type="button"
                onClick={() =>
                  quitarServicio({
                    label:
                      (field as unknown as AgendaServicioProfesionalDTO)
                        .servicioProfesional?.servicioNombre || "",
                    index,
                  })
                }
              >
                <p className="">
                  {
                    (field as unknown as AgendaServicioProfesionalDTO)
                      .servicioProfesional?.servicioNombre
                  }
                </p>
                <div className="ml-1 mt-[0.1rem]">
                  <XCircleIcon className="h-4 w-4 text-grisclaro" />
                </div>
              </button>
              <FormHiddenInput<AgendaServicioProfesionalDTO>
                name="id"
                array={{
                  index: index,
                  parentName: parentName,
                }}
              />
              <FormHiddenInput<AgendaServicioProfesionalDTO>
                name="agendaId"
                array={{
                  index: index,
                  parentName: parentName,
                }}
              />
              <FormHiddenInput<AgendaServicioProfesionalDTO>
                name="servicioProfesionalId"
                array={{
                  index: index,
                  parentName: parentName,
                }}
              />
            </div>
          );
        })}
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default Servicios;
