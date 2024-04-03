import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Option } from "react-dropdown";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { api } from "../../../api/api";
import {
  AgendaServiciosDelProfesionalDTO,
  ServiciosDelProfesionalDTO,
} from "../../../api/clients";
import ContenidoConSpinnerYError from "../../../components/ContenidoConSpinnerYError";
import { Dropdown } from "../../../components/Dropdown";
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
  } = useQuery({
    notifyOnChangeProps: "all",
    queryKey: ["servicios-del-profesional"],
    queryFn: async () => await api.servicios(Number(profesionalId)),
    throwOnError: true,
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
    console.log(fields);
    console.log(todosLosServiciosDelProfesional);

    const nombresDeServciosYaAgregados = fields.map(
      (x) =>
        (x as unknown as AgendaServiciosDelProfesionalDTO)
          .servicioDelProfesional?.servicioNombre,
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
      servicioDelProfesionalId: servicio?.id,
      servicioDelProfesional: {
        id: servicio?.id,
        servicioNombre: servicio?.servicioNombre,
      },
    });
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
                      (field as unknown as AgendaServiciosDelProfesionalDTO)
                        .servicioDelProfesional?.servicioNombre || "",
                    index,
                  })
                }
              >
                <p className="">
                  {
                    (field as unknown as AgendaServiciosDelProfesionalDTO)
                      .servicioDelProfesional?.servicioNombre
                  }
                </p>
                <div className="ml-1 mt-[0.1rem]">
                  <XCircleIcon className="text-grisclaro h-4 w-4" />
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
                  `${props.parentName}.servicios.${index}.servicioDelProfesionalId`,
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
