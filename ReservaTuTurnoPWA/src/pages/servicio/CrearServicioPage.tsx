import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Client, ServicioDTO } from "../../api/clients";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const client = new Client(API_BASE_URL);

const CrearServicio = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (servicio: ServicioDTO) => {
      try {
        const servicioCreado = await client.servicioPOST(servicio);
        console.log("servicioCreado", servicioCreado);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ServicioDTO>();
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
      <div className="border rounded-lg p-8 mb-2">
        <h2 className="text-2xl mb-4">Nuevo servicio</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center"
        >
          <input
            className="block text-slate-50 shadow appearance-none border rounded w-48 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-2"
            placeholder="Nombre"
            {...register("nombre", { required: true })}
          />
          {errors.nombre && <span>Este campo es requerido</span>}
          <input
            className="block text-slate-50 shadow appearance-none border rounded w-48 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-2"
            placeholder="Descripción"
            {...register("descripcion")}
          />
          <input
            type="submit"
            className="bg-pink-500 text-slate-50 w-48 mt-2 py-5 rounded-xl"
            value="Crear"
          />
        </form>
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
