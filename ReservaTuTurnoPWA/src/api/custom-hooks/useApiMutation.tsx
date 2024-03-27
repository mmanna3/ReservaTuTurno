import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface IProps<T> {
  fn: (args: T) => void;
  mensajeDeExito?: string;
  antesDeMensajeExito?: () => void;
}

const useApiMutation = <T,>({
  fn,
  mensajeDeExito = "Operación exitosa",
  antesDeMensajeExito = () => {},
}: IProps<T>) => {
  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (args: T) => {
      try {
        // No quitar el await por mas que al VSCode no le guste (no pasa por el catch si no)
        await fn(args);
      } catch (error) {
        console.log("Error en Request", error);
        throw new Error("Error en el servidor");
      }
    },
    onError: (error) => console.log("Error mutation:", error.message),
    onSuccess: () => {
      antesDeMensajeExito();
      toast.success(mensajeDeExito);
    },
  });

  return mutation;
};

export default useApiMutation;
