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
        <h2 className="text-2xl mb-4 text-center">Nuevo servicio</h2>
        <Form<ServicioDTO> onSubmit={onSubmit}>
          <Input<ServicioDTO> name="nombre" label="Nombre" required />
          <div className="group w-full px-2 mt-1 mb-3">
            <label className="text-[11px] bg-white left-1 z-10 relative px-1 top-2 w-auto group-focus-within:text-blue-500 group-focus-within:font-bold">
              Categoría
            </label>
            <Dropdown
              controlClassName="w-full h-11"
              className="w-full h-8"
              options={options}
              onChange={(a) => console.log(a)}
              // value={options[0]}
              placeholder="Seleccioná una categoría"
              placeholderClassName="text-sm text-gray-900 absolute top-[0.7rem]"
              menuClassName="absolute !top-[2.7rem]"
              arrowClassName="absolute !top-[1.2rem]"
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
            className="bg-pink-500 text-slate-50 w-48 mt-8 py-5 rounded"
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
