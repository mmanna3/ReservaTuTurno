import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { ProfesionalDTO } from "../../api/clients";
import useApiMutation from "../../api/custom-hooks/use-api-mutation";
import Titulo from "../../ui/titulo";
import Form from "../../ui/user-input/form/form";
import { BotonSubmit } from "../../ui/user-input/form/form-boton-submit";
import FormInput from "../../ui/user-input/form/form-input";
import { generarRandom } from "../../utilidades";

const CrearProfesionalPage = () => {
  // hay que controlar mejor los errores de los get
  // (el de categorías por ejemplo.)

  const navigate = useNavigate();

  const mutation = useApiMutation({
    mensajeDeExito: "Profesional dado de alta",
    fn: async (profesional: ProfesionalDTO) => {
      return await api.profesionalPOST(profesional);
    },
    antesDeMensajeExito: () =>
      navigate(`/profesionales?refreshToken=${generarRandom()}`),
  });

  const onSubmit: SubmitHandler<ProfesionalDTO> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="w-full">
        <Form<ProfesionalDTO> onSubmit={onSubmit}>
          <Titulo>Nuevo profesional</Titulo>
          <FormInput<ProfesionalDTO>
            name="nombre"
            label="Nombre"
            Icono={UserIcon}
            required
          />
          <FormInput<ProfesionalDTO>
            name="apellido"
            label="Apellido"
            Icono={UserGroupIcon}
            required
          />
          <FormInput<ProfesionalDTO>
            name="email"
            label="Email"
            required
            Icono={EnvelopeIcon}
          />
          <FormInput<ProfesionalDTO>
            name="telefono"
            label="Teléfono"
            Icono={DevicePhoneMobileIcon}
            required
          />
          <BotonSubmit texto="Agregar" estaDeshabilitado={mutation.isPending} />
        </Form>
      </div>
    </>
  );
};

export default CrearProfesionalPage;
