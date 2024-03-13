import { useMutation, useQuery } from "@tanstack/react-query";
import { Option as DropdownOption } from "react-dropdown";
import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { CategoriaDeServicioDTO, ServicioDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { Dropdown } from "./Dropdown";

const convertirEnOptions = (array: CategoriaDeServicioDTO[]) => {
  return array.map((e) => {
    const option: DropdownOption = {
      label: e.nombre,
      value: e.id?.toString() ?? "0",
      className: "text-base !text-gray-900",
    };
    return option;
  });
};

const CrearServicio = () => {
  // hay que controlar mejor los errores
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => await api.categoriaDeServicioAll(),
    throwOnError: true,
  });

  const options = convertirEnOptions(categorias || []);

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
      // mutation.mutate(data);
      // navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Form<ServicioDTO> onSubmit={onSubmit}>
          <h2 className="mb-2 mt-8 w-full text-left text-2xl font-medium">
            Nuevo servicio
          </h2>
          <Input<ServicioDTO> name="nombre" label="Nombre" required />
          <Dropdown
            label="Categoría"
            placeholder="Seleccioná una categoría"
            options={options}
          ></Dropdown>
          <Input<ServicioDTO> name="descripcion" label="Descripción" />
          <Input<ServicioDTO>
            type="number"
            name="precioPorDefecto"
            label="Precio"
          />
          <Input<ServicioDTO>
            type="number"
            name="duracionDelTurnoPorDefectoEnMinutos"
            label="Duración"
            placeholder="en minutos"
          />
          <input
            type="submit"
            //bg-pink-500
            className="mt-8 h-16 w-[340px] rounded-xl bg-[#FC97DB] text-lg font-medium text-white"
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
