import { useParams } from "react-router-dom";
import { AgendaDTO } from "../../../api/clients";
import FormHiddenInput from "../../../components/FormHiddenInput";
import AgendaServicios from "./AgendaServicios";
import DiasDeLaSemana from "./DiasDeLaSemanaCheckboxs";
import { FranjasHorarias } from "./FranjasHorarias";

interface IProps {
  array: {
    index: string;
    parentName: string;
  };
}

const UnaAgenda = (props: IProps) => {
  const { id: profesionalId } = useParams();

  return (
    <>
      <FormHiddenInput<AgendaDTO>
        name="profesionalId"
        value={profesionalId as string}
        array={props.array}
      />
      <DiasDeLaSemana array={props.array} />
      <FranjasHorarias array={props.array} />
      <AgendaServicios array={props.array} />
    </>
  );
};

export default UnaAgenda;
