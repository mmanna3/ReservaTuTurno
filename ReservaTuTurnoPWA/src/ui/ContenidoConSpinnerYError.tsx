import { ReactNode } from "react";
import Spinner from "./Spinner";

interface ContenidoConSpinnerYErrorProps {
  isLoading: boolean;
  error: Error | null;
  hasData: boolean;
  children: ReactNode;
  mensajeSpinner?: string;
}

const ContenidoConSpinnerYError = (props: ContenidoConSpinnerYErrorProps) => {
  return (
    <>
      {props.isLoading ? (
        <Spinner mensaje={props.mensajeSpinner || ""} />
      ) : props.error ? (
        <div>Error: {props.error.message}</div>
      ) : props.hasData ? (
        props.children
      ) : null}
    </>
  );
};

export default ContenidoConSpinnerYError;
