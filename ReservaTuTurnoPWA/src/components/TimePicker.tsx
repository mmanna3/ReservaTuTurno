import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import Picker, { PickerValue } from "react-mobile-picker";

export default function ModalPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState<PickerValue>({
    hora: "08",
    minutos: "00",
  });

  const handlePickerChange = useCallback((newValue: PickerValue) => {
    setPickerValue(newValue);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="ml-4 rounded-md bg-black/40 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {pickerValue.hora} : {pickerValue.minutos}
      </button>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Seleccioná la hora
                  </Dialog.Title>
                  <div className="mt-2">
                    <Picker
                      value={pickerValue}
                      onChange={handlePickerChange}
                      wheelMode="natural"
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
                                    ? "font-semibold text-neutral-900"
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
                                    ? "font-semibold text-neutral-900"
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
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
