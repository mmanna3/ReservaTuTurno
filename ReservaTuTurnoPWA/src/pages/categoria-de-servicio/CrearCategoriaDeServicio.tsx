import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { CategoriaDeServicioDTO } from "../../api/clients";
import useApiMutation from "../../api/custom-hooks/useApiMutation";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Titulo from "../../components/Titulo";

const CrearCategoriaDeServicio = () => {
  const navigate = useNavigate();

  const mutation = useApiMutation<CategoriaDeServicioDTO>({
    fn: async (categoria: CategoriaDeServicioDTO) => {
      await api.categoriaDeServicioPOST(categoria);
    },
    antesDeMensajeExito: () => navigate(-1),
    mensajeDeExito: "Categoría creada",
  });

  const onSubmit: SubmitHandler<CategoriaDeServicioDTO> = (data) => {
    mutation.mutate(data);
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
          disabled={mutation.isPending}
        />
      </Form>
    </>
  );
};

export default CrearCategoriaDeServicio;
