import { ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ContenedorCentradoConMargenes from "./ContenedorCentradoConMargenes";

type PropsWithChildren<P> = P & { children?: ReactNode };

interface IProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
}

const Form = <T extends FieldValues>(props: PropsWithChildren<IProps<T>>) => {
  console.log("Render del form");

  const methods = useForm<T>({
    defaultValues: props.defaultValues,
  });
  // Pasar defaultValues por props (para edit)
  // Ver qué onda las validaciones con yup

  return (
    <FormProvider<T> {...methods}>
      <ContenedorCentradoConMargenes>
        <form
          className="w-full"
          onSubmit={methods.handleSubmit(props.onSubmit)}
        >
          {props.children}
        </form>
      </ContenedorCentradoConMargenes>
    </FormProvider>
  );
};

export default Form;
