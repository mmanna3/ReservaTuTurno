import { ServiciosDelProfesionalDTO } from "../../../api/clients";
import { Dropdown } from "../../../components/Dropdown";
import Input from "../../../components/Input";
import { Subtitulo } from "../../../components/Subtitulo";

const Equipo = () => {
  return (
    <>
      <Subtitulo>Equipo</Subtitulo>
      <Dropdown<ServiciosDelProfesionalDTO>
        name="profesionalId"
        label="Profesional"
        // required
        options={[]}
      />
      <Input<ServiciosDelProfesionalDTO>
        name="servicioId"
        label="Nombre"
        required
      />

      <button className="rounded-xl border border-gris p-2 text-sm text-gris">
        Agregar profesional
      </button>
    </>
  );
};

export default Equipo;
