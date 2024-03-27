import { useQuery } from "@tanstack/react-query";

interface IProps<T> {
  fn: () => Promise<T>;
  key: string;
}

const useApiQuery = <T,>(props: IProps<T>) => {
  const query = useQuery({
    queryKey: [props.key],
    throwOnError: true,
    queryFn: async () => {
      try {
        return await props.fn();
      } catch (error) {
        console.log("Error en Request", error);
        throw new Error("Error en el servidor: " + error);
      }
    },
  });

  return query;
};

export default useApiQuery;
