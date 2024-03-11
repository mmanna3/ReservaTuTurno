import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { CategoriaDeServicioDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";

const CrearCategoriaDeServicio = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (categoria: CategoriaDeServicioDTO) => {
      try {
        const servicioCreado = await api.categoriaDeServicio(categoria);
        console.log("servicioCreado", servicioCreado);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit: SubmitHandler<CategoriaDeServicioDTO> = (data) => {
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
        <h2 className="text-2xl mb-4 text-center">
          Nueva categoría de servicio
        </h2>
        <Form<CategoriaDeServicioDTO> onSubmit={onSubmit}>
          <Input<CategoriaDeServicioDTO>
            name="nombre"
            label="Nombre"
            required
          />
          <Input<CategoriaDeServicioDTO>
            name="descripcion"
            label="Descripción"
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
              <div>Categoría agregada correctamente</div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default CrearCategoriaDeServicio;
