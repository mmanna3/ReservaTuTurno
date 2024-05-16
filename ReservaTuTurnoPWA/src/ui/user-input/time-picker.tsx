import Modal from "@ui/modal";
import { useEffectOnce } from "@utilidades/useEffectOnce";
import { useCallback, useState } from "react";
import Picker, { PickerValue } from "react-mobile-picker";
import InputDisplay from "./input-display";

export interface ITimePicker {
  valor: unknown;
  label: string;
  required?: boolean;
  hayError: boolean;
  horaDefault?: string;
  minutosDefault?: string;
  onChange?: (x: string) => void;
}

export default function TimePicker(props: ITimePicker) {
  const [isOpen, setIsOpen] = useState(false);

  const valorDefault = {
    hora: (props.valor as string)?.slice(0, 2) || props.horaDefault || "00",
    minutos: (props.valor as string)?.slice(-2) || props.minutosDefault || "00",
  };

  const [pickerValue, setPickerValue] = useState<PickerValue>(valorDefault);

  useEffectOnce(() => {
    handlePickerChange(valorDefault);
  });

  const handlePickerChange = useCallback(
    (newValue: PickerValue) => {
      setPickerValue(newValue);
      props.onChange && props.onChange(`${newValue.hora}:${newValue.minutos}`);
    },
    [props],
  );

  return (
    <>
      <InputDisplay
        hayError={props.hayError}
        label={props.label}
        esRequerido={props.required}
        onClick={() => setIsOpen(true)}
      >
        <span className="mr-[2px]">{pickerValue.hora}</span> :
        <span className="ml-[2px]">{pickerValue.minutos}</span>
        {/* <ClockIcon className="ml-auto mr-1 mt-[1.5px] size-5 stroke-[1.7px] text-rosa" /> */}
      </InputDisplay>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="mt-2 w-48">
          {/* <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Elegí el horario
            </Dialog.Title> */}
          <Picker
            value={pickerValue}
            onChange={handlePickerChange}
            wheelMode="natural"
            itemHeight={50}
            height={350}
          >
            <Picker.Column name="hora">
              {Array.from({ length: 24 }, (_, i) =>
                String(i).padStart(2, "0"),
              ).map((hora) => (
                <Picker.Item key={hora} value={hora}>
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "font-semibold text-negro"
                          : "text-neutral-400"
                      }
                    >
                      {hora}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="minutos">
              {Array.from({ length: 4 }, (_, i) =>
                String(15 * i).padStart(2, "0"),
              ).map((minutos) => (
                <Picker.Item key={minutos} value={minutos}>
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "font-semibold text-negro"
                          : "text-neutral-400"
                      }
                    >
                      {minutos}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="focus-visible:ring-rosa-500 inline-flex rounded-xl border bg-grisclarito px-4 py-2 text-sm font-medium text-gris shadow-sm hover:border-blanco hover:bg-rosaclaro focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
