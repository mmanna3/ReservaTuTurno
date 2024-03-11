import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { ServicioDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";

const CrearServicio = () => {
  // hay que controlar mejor los errores
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const { data: categorias } = useQuery({
    queryKey: ["servicios"],
    queryFn: async () => await api.categoriaDeServicioAll(),
    throwOnError: true,
  });

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
        <h2 className="text-2xl mb-4 text-center">Nuevo servicio</h2>
        <Form<ServicioDTO> onSubmit={onSubmit}>
          <Input<ServicioDTO> name="nombre" label="Nombre" required />
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
