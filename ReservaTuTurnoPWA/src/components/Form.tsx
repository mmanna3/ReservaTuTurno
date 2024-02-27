import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

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
      <form
        onSubmit={methods.handleSubmit(props.onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        {props.children}
      </form>
    </FormProvider>
  );
};

export default Form;
