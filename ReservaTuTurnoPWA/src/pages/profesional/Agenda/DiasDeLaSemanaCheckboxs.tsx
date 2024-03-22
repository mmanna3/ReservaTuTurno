import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AgendaDTO } from "../../../api/clients";
import FormHiddenInput from "../../../components/FormHiddenInput";
import { DiaDeLaSemana } from "../../../utils";

interface IDiaCheckbox {
  dia: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function DiaCheckbox(props: IDiaCheckbox) {
  return (
    <div className="mb-[0.125rem] flex min-h-[1.5rem] flex-col">
      <label className="ms-1 hover:cursor-pointer" htmlFor={props.dia}>
        {props.dia[0]}
      </label>
      <input
        className="border-secondary-500 checked:focus:before:shadow-checkbox dark:checked:border-primary dark:checked:bg-primary relative float-left me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-transparent before:content-[''] checked:border-rosa checked:bg-rosa checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400"
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        id={props.dia}
      />
    </div>
  );
}

const DiasDeLaSemana = () => {
  const { setValue } = useFormContext();

  const [diasSeleccionados, setDiasSeleccionados] = useState<DiaDeLaSemana[]>(
    [],
  );

  useEffect(() => {
    setValue(
      "dias",
      diasSeleccionados.reduce((acc, dia) => acc | dia, 0),
    );
  }, [diasSeleccionados, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const diaSeleccionado =
      DiaDeLaSemana[e.target.id as keyof typeof DiaDeLaSemana];
    const nuevoValor = diasSeleccionados.includes(diaSeleccionado)
      ? diasSeleccionados.filter(
          (dia: DiaDeLaSemana) => dia !== diaSeleccionado,
        )
      : [...diasSeleccionados, diaSeleccionado];
    setDiasSeleccionados(nuevoValor);
  };

  return (
    <>
      <div className="flex justify-around">
        {Object.keys(DiaDeLaSemana)
          .filter((v) => isNaN(Number(v)))
          .map((dia, index) => {
            const diaValue = 1 << index;
            return (
              <DiaCheckbox
                key={dia}
                dia={dia}
                checked={diasSeleccionados.includes(diaValue)}
                onChange={handleChange}
              />
            );
          })}
      </div>
      <FormHiddenInput<AgendaDTO> name="dias" value={0} />
    </>
  );
};

export default DiasDeLaSemana;
