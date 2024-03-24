import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Option } from "react-dropdown";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
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

      setServiciosDisponibles(a);
    }
  }, [servicios, isLoading, isError]);

  const [serviciosDisponibles, setServiciosDisponibles] = useState<Option[]>(
    [],
  );

  const { fields, append, remove } = useFieldArray({
    name: "servicios",
  });

  const onServicioAgregado = (servicio: Option) => {
    const serviciosFiltrados = serviciosDisponibles.filter(
      (x) => x.value !== servicio.value,
    );
    setServiciosDisponibles(serviciosFiltrados);
    append({
      id: Number(servicio.value),
    });
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
        onValueChange={onServicioAgregado}
      />
      {fields.map((field, index) => (
        <div key={field.id}>
          <p>a</p>
          <input
            hidden
            key={field.id}
            {...register(`servicios.${index}.id`, {
              valueAsNumber: true,
            })}
          />
        </div>
      ))}
    </ContenidoConSpinnerYError>
  );
};

export default AgendaServicios;
