import { useMutation, useQuery } from "@tanstack/react-query";
import Dropdown, { Option as DropdownOption } from "react-dropdown";
import "react-dropdown/style.css";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { CategoriaDeServicioDTO, ServicioDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";

const convertirEnOptions = (array: CategoriaDeServicioDTO[]) => {
  return array.map((e) => {
    const option: DropdownOption = {
      label: e.nombre,
      value: e.id?.toString() ?? "0",
      className: "text-sm !text-gray-900",
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
          <h2 className="w-full text-left text-2xl mt-8 mb-2 font-medium">
            Nuevo servicio
          </h2>
          <Input<ServicioDTO> name="nombre" label="Nombre" required />
          <div className="group w-full mt-0 mb-3">
            <label className="text-[12px] text-gray-700 bg-white left-1 z-10 relative px-1 top-3 w-auto group-focus-within:text-blue-500 group-focus-within:font-bold">
              Categoría
            </label>
            <Dropdown
              controlClassName="w-full h-12"
              className="w-full h-8"
              options={options}
              onChange={(a) => console.log(a)}
              // value={options[0]}
              placeholder="Seleccioná una categoría"
              placeholderClassName="text-sm text-gray-900 absolute top-[0.8rem]"
              menuClassName="absolute !top-[2.7rem]"
              arrowClassName="absolute !top-[1.4rem]"
            />
          </div>
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
            className="bg-[#FC97DB] text-gray-700 h-12 mt-8 rounded text-lg w-[340px]"
            value="Crear"
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
