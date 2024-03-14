import { useMutation, useQuery } from "@tanstack/react-query";
import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { CategoriaDeServicioDTO, ServicioDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Titulo from "../../components/Titulo";
import {
  DuracionDelServicioArray,
  IDuracionDelServicio,
  convertirEnOptions,
} from "../../utils";
import { Dropdown } from "./Dropdown";

const CrearServicio = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => await api.categoriaDeServicioAll(),
    throwOnError: true,
  });

  const options = convertirEnOptions<CategoriaDeServicioDTO>(
    categorias || [],
    "nombre",
    "id",
  );

  const duracionOptions = convertirEnOptions<IDuracionDelServicio>(
    DuracionDelServicioArray,
    "label",
    "value",
  );

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (servicio: ServicioDTO) => {
      try {
        const servicioCreado = await api.servicioPOST(servicio);
        console.log("servicioCreado", servicioCreado);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<ServicioDTO> = (data) => {
    try {
      console.log(data);
      mutation.mutate(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Form<ServicioDTO> onSubmit={onSubmit}>
          <Titulo>Nuevo Servicio</Titulo>
          <Input<ServicioDTO> name="nombre" label="Nombre" required />
          <Dropdown<ServicioDTO>
            name="categoriaDeServicioId"
            label="Categoría"
            placeholder="Seleccioná una categoría"
            options={options}
            required
          ></Dropdown>
          <Input<ServicioDTO> name="descripcion" label="Descripción" />
          <Input<ServicioDTO>
            type="number"
            name="precioPorDefecto"
            label="Precio"
            required
          />
          <Dropdown<ServicioDTO>
            name="duracionDelTurnoPorDefectoEnMinutos"
            label="Duración"
            placeholder=""
            options={duracionOptions}
            required
          ></Dropdown>
          <input
            type="submit"
            className="mt-8 h-16 w-full rounded-xl bg-rosa text-lg font-medium text-blanco"
            value="Agregar"
          />
        </Form>
      </div>
      <div>
        {mutation.isPending ? (
          "Adding todo..."
        ) : (
          <>
            {mutation.isError ? (
              <div>Hubo un error: {mutation.error.message}</div>
            ) : null}

            {mutation.isSuccess ? (
              <div>Servicio agregado correctamente</div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default CrearServicio;
