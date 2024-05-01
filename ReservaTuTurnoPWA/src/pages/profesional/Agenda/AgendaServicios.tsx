import { XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Option } from "react-dropdown";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
  AgendaServicioProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "../../../api/clients";
import useApiQuery from "../../../api/custom-hooks/useApiQuery";
import ContenidoConSpinnerYError from "../../../ui/ContenidoConSpinnerYError";
import { Dropdown } from "../../../ui/Dropdown";
import { convertirEnOptions } from "../../../utils";

interface IProps {
  parentName: string;
  agendaId: number | null;
}

const AgendaServicios = (props: IProps) => {
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
  const [serviciosDisponibles, setServiciosDisponibles] = useState<Option[]>(
    [],
  );

  const { fields, append, remove } = useFieldArray({
    name: `${props.parentName}.servicios`,
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

    const options = convertirEnOptions<ServiciosDelProfesionalDTO>(
      todosSinLosYaAgregados || [],
      "servicioNombre",
      "id",
    );

    setServiciosDisponibles(options);
  }, [fields, todosLosServiciosDelProfesional]);

  const onAgregarServicio = (servicioOption: Option) => {
    const servicio = todosLosServiciosDelProfesional.find(
      (x) => x.servicioNombre === servicioOption.label,
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

  const { register } = useFormContext();

  return (
    <ContenidoConSpinnerYError
      isLoading={isFetching || isLoading}
      error={error}
      hasData={servicios === null ? false : true}
      mensajeSpinner="Cargando agendas 🗓️"
    >
      <Dropdown<ServiciosDelProfesionalDTO>
        name="servicioNombre"
        label="Servicios"
        placeholder="Seleccioná un servicio"
        options={serviciosDisponibles}
        onValueChange={onAgregarServicio}
      />
      <div className="ml-2 mt-10 flex flex-wrap gap-2">
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
              <input
                hidden
                {...register(`${props.parentName}.servicios.${index}.id`, {
                  valueAsNumber: true,
                })}
              />
              <input
                hidden
                {...register(
                  `${props.parentName}.servicios.${index}.agendaId`,
                  {
                    valueAsNumber: true,
                  },
                )}
              />
              <input
                hidden
                {...register(
                  `${props.parentName}.servicios.${index}.servicioProfesionalId`,
                  {
                    valueAsNumber: true,
                  },
                )}
              />
            </div>
          );
        })}
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default AgendaServicios;
