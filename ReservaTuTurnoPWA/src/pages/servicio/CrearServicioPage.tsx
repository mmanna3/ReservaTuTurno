import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Client, ServicioDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";

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
        <Form<ServicioDTO> onSubmit={onSubmit}>
          <Input<ServicioDTO> name="nombre" placeholder="Nombre" required />
          <Input<ServicioDTO> name="descripcion" placeholder="Descripción" />
          <Input<ServicioDTO>
            type="number"
            name="precioPorDefecto"
            placeholder="Precio"
          />
          <Input<ServicioDTO>
            type="number"
            name="duracionDelTurnoPorDefectoEnMinutos"
            placeholder="Duración (en minutos)"
          />
          <input
            type="submit"
            className="bg-pink-500 text-slate-50 w-48 mt-2 py-5 rounded-xl"
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
