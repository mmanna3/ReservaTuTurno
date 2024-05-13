import { AgendaDTO } from "@api/clients";
import FormHiddenInput from "@ui/user-input/form/form-hidden-input";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DiaDeLaSemana } from "../../../utilidades";

interface IDiaCheckbox {
  dia: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface IProps {
  parentName: string;
}

function DiaCheckbox(props: IDiaCheckbox) {
  return (
    <div className="mb-[0.125rem] flex min-h-[1.5rem] flex-col">
      <label className="ms-[2.9px] hover:cursor-pointer" htmlFor={props.dia}>
        {props.dia[0]}
      </label>
      <input
        className="checked:focus:before:shadow-checkbox me-[4px] mt-[0.15rem] size-5 appearance-none rounded-[0.25rem] border-[0.08rem] bg-grisclarito/10 shadow-sm outline-none before:pointer-events-none before:absolute  before:opacity-0 before:shadow-transparent before:content-[''] checked:border-rosa checked:bg-rosa checked:before:opacity-[0.16] checked:after:absolute checked:after:ms-[0.38rem] checked:after:mt-[0.3px] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ms-[0.38rem] checked:focus:after:mt-[0.3px] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right"
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        id={props.dia}
      />
    </div>
  );
}

function getDiasSeleccionadosFromBitwise(
  bitwiseValue: number,
): DiaDeLaSemana[] {
  const selectedDias: DiaDeLaSemana[] = [];

  // Loop through each day in the enum, checking for bitwise match
  for (const dia in DiaDeLaSemana) {
    if (Object.prototype.hasOwnProperty.call(DiaDeLaSemana, dia)) {
      const diaValue = (DiaDeLaSemana as any)[dia]; // Access enum value
      if ((bitwiseValue & diaValue) !== 0) {
        // Check for bitwise presence
        selectedDias.push(diaValue); // Add matching day to array
      }
    }
  }

  return selectedDias;
}

const DiasDeLaSemana = (props: IProps) => {
  const { setValue, getValues } = useFormContext();

  const [diasSeleccionados, setDiasSeleccionados] = useState<DiaDeLaSemana[]>(
    [],
  );

  useEffect(() => {
    const a = getValues(`${props.parentName}.dias`);
    setDiasSeleccionados(getDiasSeleccionadosFromBitwise(a));
  }, []);

  useEffect(() => {
    if (diasSeleccionados.length > 0)
      setValue(
        `${props.parentName}.dias`,
        diasSeleccionados.reduce((acc, dia) => acc | dia, 0),
      );
  }, [diasSeleccionados, props.parentName, setValue]);

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
      <div className="ml-1 flex justify-between">
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
