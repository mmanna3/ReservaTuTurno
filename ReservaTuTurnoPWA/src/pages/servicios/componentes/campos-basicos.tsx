import { ClockIcon } from "@heroicons/react/24/outline";
import FormAutocomplete from "@ui/user-input/form/form-autocomplete";
import FormTextArea from "@ui/user-input/form/form-text-area";
import { api } from "../../../api/api";
import { CategoriaDeServicioDTO, ServicioDTO } from "../../../api/clients";
import useApiQuery from "../../../api/custom-hooks/use-api-query";
import FormInput from "../../../ui/user-input/form/form-input";
import {
  DuracionDelServicioArray,
  IDuracionDelServicio,
  convertirEnOpciones,
} from "../../../utilidades";

const CamposBasicos = () => {
  const { data: categorias } = useApiQuery({
    key: ["categorias"],
    fn: async () => await api.categoriaDeServicioAll(),
  });

  const OpcionesCategorias = convertirEnOpciones<CategoriaDeServicioDTO>(
    categorias || [],
    "nombre",
    "id",
  );

  const OpcionesDuracion = convertirEnOpciones<IDuracionDelServicio>(
    DuracionDelServicioArray,
    "label",
    "value",
  );

  return (
    <div>
      <FormInput<ServicioDTO> name="nombre" label="Nombre" required />
      <FormAutocomplete<ServicioDTO>
        name="categoriaDeServicioId"
        label="Categoría"
        placeholder="Elegí una categoría"
        opciones={OpcionesCategorias}
        required
      />
      <FormTextArea<ServicioDTO> name="descripcion" label="Descripción" />
      <div className="flex w-full gap-2">
        <div className="w-full">
          <FormInput<ServicioDTO>
            type="number"
            name="precioPorDefecto"
            label="Precio desde"
            required
          />
        </div>
        <div className="w-full">
          <FormAutocomplete<ServicioDTO>
            name="duracionDelTurnoPorDefectoEnMinutos"
            label="Duración"
            placeholder=""
            opciones={OpcionesDuracion}
            required
            Icono={ClockIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default CamposBasicos;
