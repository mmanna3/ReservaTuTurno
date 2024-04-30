import { api } from "../../../api/api";
import { CategoriaDeServicioDTO, ServicioDTO } from "../../../api/clients";
import useApiQuery from "../../../api/custom-hooks/useApiQuery";
import { Dropdown } from "../../../components/Dropdown";
import FormInput from "../../../components/FormInput";
import {
  DuracionDelServicioArray,
  IDuracionDelServicio,
  convertirEnOptions,
} from "../../../utils";

const CamposBasicos = () => {
  const { data: categorias } = useApiQuery({
    key: ["categorias"],
    fn: async () => await api.categoriaDeServicioAll(),
  });

  const OpcionesCategorias = convertirEnOptions<CategoriaDeServicioDTO>(
    categorias || [],
    "nombre",
    "id",
  );

  const OpcionesDuracion = convertirEnOptions<IDuracionDelServicio>(
    DuracionDelServicioArray,
    "label",
    "value",
  );

  return (
    <div>
      <FormInput<ServicioDTO> name="nombre" label="Nombre" required />
      <Dropdown<ServicioDTO>
        name="categoriaDeServicioId"
        label="Categoría"
        placeholder="Seleccioná una categoría"
        options={OpcionesCategorias}
        required
      ></Dropdown>
      <FormInput<ServicioDTO> name="descripcion" label="Descripción" />
      <div className="flex gap-2">
        <FormInput<ServicioDTO>
          type="number"
          name="precioPorDefecto"
          label="Precio"
          required
        />
        <Dropdown<ServicioDTO>
          name="duracionDelTurnoPorDefectoEnMinutos"
          label="Duración"
          placeholder=""
          options={OpcionesDuracion}
          required
        ></Dropdown>
      </div>
    </div>
  );
};

export default CamposBasicos;
