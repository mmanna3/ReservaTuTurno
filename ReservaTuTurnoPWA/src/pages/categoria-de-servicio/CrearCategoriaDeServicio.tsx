import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { CategoriaDeServicioDTO } from "../../api/clients";
import useApiMutation from "../../api/custom-hooks/useApiMutation";
import { BotonSubmit } from "../../ui/BotonSubmit";
import Form from "../../ui/Form";
import FormInput from "../../ui/FormInput";
import Titulo from "../../ui/Titulo";

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
        <FormInput<CategoriaDeServicioDTO>
          name="nombre"
          label="Nombre"
          required
        />
        <FormInput<CategoriaDeServicioDTO>
          name="descripcion"
          label="Descripción"
        />
        <BotonSubmit estaDeshabilitado={mutation.isPending} />
      </Form>
    </>
  );
};

export default CrearCategoriaDeServicio;
