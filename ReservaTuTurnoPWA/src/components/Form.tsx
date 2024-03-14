import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ContenedorCentradoConMargenes from "./ContenedorCentradoConMargenes";

type PropsWithChildren<P> = P & { children?: ReactNode };

interface IProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>(props: PropsWithChildren<IProps<T>>) => {
  const methods = useForm<T>();
  // Pasar defaultValues por props (para edit)
  // Ver qué onda las validaciones con yup

  return (
    <FormProvider<T> {...methods}>
      <ContenedorCentradoConMargenes>
        <form onSubmit={methods.handleSubmit(props.onSubmit)}>
          {props.children}
        </form>
      </ContenedorCentradoConMargenes>
    </FormProvider>
  );
};

export default Form;
