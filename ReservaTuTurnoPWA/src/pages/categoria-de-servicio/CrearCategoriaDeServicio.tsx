import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { CategoriaDeServicioDTO } from "../../api/clients";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Titulo from "../../components/Titulo";

const CrearCategoriaDeServicio = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (categoria: CategoriaDeServicioDTO) => {
      try {
        const servicioCreado = await api.categoriaDeServicioPOST(categoria);
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
      <Form<CategoriaDeServicioDTO> onSubmit={onSubmit}>
        <Titulo>Nueva categoría de servicio</Titulo>
        <Input<CategoriaDeServicioDTO> name="nombre" label="Nombre" required />
        <Input<CategoriaDeServicioDTO> name="descripcion" label="Descripción" />
        <input
          type="submit"
          className="mt-8 w-full rounded-xl bg-rosa py-5 text-slate-50"
          value="Crear"
        />
      </Form>
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
