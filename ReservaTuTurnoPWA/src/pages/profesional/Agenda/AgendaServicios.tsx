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

const AgendaServicios = () => {
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
        "servicio",
        "id",
      );

      setTodosLosServiciosDelProfesional(a);
      setServiciosDisponibles(a);
    }
  }, [servicios, isLoading, isError]);

  const [todosLosServiciosDelProfesional, setTodosLosServiciosDelProfesional] =
    useState<Option[]>([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState<Option[]>(
    [],
  );

  const { fields, append, remove } = useFieldArray({
    name: "servicios",
  });

  const onAgregarServicio = (servicio: Option) => {
    const serviciosFiltrados = serviciosDisponibles.filter(
      (x) => x.value !== servicio.value,
    );
    setServiciosDisponibles(serviciosFiltrados);
    append({
      id: Number(servicio.value),
      nombre: servicio.label,
    });
  };

  const quitarServicio = ({
    label,
    index,
  }: {
    label: string;
    index: number;
  }): void => {
    console.log(label);
    const servicio = todosLosServiciosDelProfesional?.find(
      (x) => x.label === label,
    );
    if (servicio) {
      const nuevosServiciosDisponibles = [...serviciosDisponibles, servicio];
      setServiciosDisponibles(nuevosServiciosDisponibles);
      remove(index);
    }
  };

  const { register } = useFormContext();

  return (
    <ContenidoConSpinnerYError
      isLoading={isFetching || isLoading}
      error={error}
      hasData={servicios === null ? false : true}
    >
      <Dropdown<ServiciosDelProfesionalDTO>
        name="servicio"
        label="Servicios"
        placeholder="Seleccioná un servicio"
        options={serviciosDisponibles}
        onValueChange={onAgregarServicio}
      />
      <div className="ml-2 mt-10 flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <button
              className="flex rounded-xl border p-1 text-sm text-grisclaro"
              type="button"
              onClick={() =>
                quitarServicio({ label: (field as any).nombre, index })
              }
            >
              <p className="">{(field as any).nombre}</p>
              <div className="ml-1 mt-[0.1rem]">
                <CloseCircle size={18} />
              </div>
            </button>
            <input
              hidden
              key={field.id}
              {...register(`servicios.${index}.id`, {
                valueAsNumber: true,
              })}
            />
          </div>
        ))}
      </div>
    </ContenidoConSpinnerYError>
  );
};

export default AgendaServicios;
