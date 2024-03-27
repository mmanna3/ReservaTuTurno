import { useMutation } from "@tanstack/react-query";

interface IProps<T> {
  fn: (args: T) => void;
}

const useApiMutation = <T,>(props: IProps<T>) => {
  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (args: T) => {
      try {
        await props.fn(args);
      } catch (error) {
        console.log("Error en Request", error);
        throw new Error("Error en el servidor");
      }
    },
    onError: (error) => console.log("Error mutation:", error.message),
    onSuccess: () => console.log("Guardado"),
  });

  return {
    mutation,
  };
};

export default useApiMutation;
