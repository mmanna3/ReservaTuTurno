import { Dialog, Transition } from "@headlessui/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Fragment, useCallback, useEffect, useState } from "react";
import Picker, { PickerValue } from "react-mobile-picker";

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

  useEffect(() => {
    handlePickerChange(valorDefault);
  }, []);

  const handlePickerChange = useCallback((newValue: PickerValue) => {
    setPickerValue(newValue);
    props.onChange && props.onChange(`${newValue.hora}:${newValue.minutos}`);
  }, []);

  return (
    <>
      <div
        className="group relative mt-5 w-full rounded-xl bg-[#F9F9F9] p-2"
        onClick={() => setIsOpen(true)}
      >
        <label
          className={`relative ml-1 w-auto bg-transparent px-1 text-[12px] text-gris peer-[.is-open]:!text-[#32BF8D] ${
            props.hayError ? "!text-rojo" : ""
          }`}
        >
          {props.label} {props.required ? "*" : null}
        </label>
        <div className="ml-2 flex">
          <span className="mr-[2px]">{pickerValue.hora}</span> :
          <span className="ml-[2px]">{pickerValue.minutos}</span>
          <ClockIcon className="ml-auto mr-1 mt-[1.5px] h-5 w-5 text-negro" />
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-64 transform overflow-hidden rounded-2xl bg-blanco p-6 text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Elegí el horario
                  </Dialog.Title> */}
                  <div className="mt-2">
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
                  </div>
                  {/* <div className="">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      OK
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
