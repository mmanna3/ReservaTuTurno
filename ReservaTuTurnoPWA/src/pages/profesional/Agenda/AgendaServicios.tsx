import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Option } from "react-dropdown";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CloseCircle } from "solar-icon-set";
import { api } from "../../../api/api";
import { ServiciosDelProfesionalDTO } from "../../../api/clients";
import ContenidoConSpinnerYError from "../../../components/ContenidoConSpinnerYError";
import { Dropdown } from "../../../components/Dropdown";
import { convertirEnOptions } from "../../../utils";

interface IProps {
  parentName: string;
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
      const a = convertirEnOptions<ServiciosDelProfesionalDTO>(
        servicios || [],
        "servicioNombre",
        "id",
      );

      setTodosLosServiciosDelProfesional(a);
    }
  }, [servicios, isLoading, isError]);

  const [todosLosServiciosDelProfesional, setTodosLosServiciosDelProfesional] =
    useState<Option[]>([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState<Option[]>(
    [],
  );

  const { fields, append, remove } = useFieldArray({
    name: `${props.parentName}.servicios`,
  });

  useEffect(() => {
    const nombresDeServciosYaAgregados = fields.map(
      (x) => (x as any).servicioNombre,
    );
    const todos = todosLosServiciosDelProfesional.filter(
      (x) => !nombresDeServciosYaAgregados.includes(x.label),
    );
    setServiciosDisponibles(todos);
  }, [fields, todosLosServiciosDelProfesional]);

  const onAgregarServicio = (servicio: Option) => {
    append({
      id: Number(servicio.value),
      servicioNombre: servicio.label,
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
                    label: (field as any).servicioNombre,
                    index,
                  })
                }
              >
                <p className="">{(field as any).servicioNombre}</p>
                <div className="ml-1 mt-[0.1rem]">
                  <CloseCircle size={18} />
                </div>
              </button>
              <input
                hidden
                key={field.id}
                {...register(`${props.parentName}.servicios.${index}.id`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          );
        })}
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default AgendaServicios;
