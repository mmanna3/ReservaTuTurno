import Modal from "@ui/modal";
import cx from "classnames";
import { useCombobox } from "downshift";
import { useState } from "react";
import Input from "./input";
import InputDisplay from "./input-display";

function filtrar(loEscrito: string) {
  const enMinuscula = loEscrito.toLowerCase();

  return function booksFilter(opcion: Opcion) {
    return !loEscrito || opcion.valor.toLowerCase().includes(enMinuscula);
  };
}

export interface Opcion {
  id: string;
  valor: string;
}

interface IProps {
  label: string;
  placeholder?: string;
  opciones: Opcion[];
  defaultValue?: Opcion;
  required?: boolean;
  onValueChange?: (arg: Opcion) => void;
}

export default function ComboBox(props: IProps) {
  const [items, setItems] = useState(props.opciones);
  const [selectedItem, setSelectedItem] = useState<Opcion | null>(null);
  const {
    // isOpen,
    // getToggleButtonProps,
    // getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(props.opciones.filter(filtrar(inputValue)));
    },
    items,
    itemToString(item) {
      return item ? item.valor : "";
    },
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      setSelectedItem(newSelectedItem),
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* <div className="flex w-72 flex-col gap-1"> */}
      <div>
        {/* <label className="w-fit" {...getLabelProps()}>
          Choose your favorite book:
        </label> */}
        {/* <div className="flex gap-0.5 bg-white shadow-sm"> */}
        <div>
          <InputDisplay
            // className="w-full p-1.5"
            // {...getInputProps()}
            onClick={() => setIsOpen(true)}
            label="El nombre del campo"
            hayError={false}
          >
            <>{selectedItem ? selectedItem.valor : "Best book ever"}</>
          </InputDisplay>
          {/* <button
            aria-label="toggle menu"
            className="px-2"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button> */}
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          <Input label="Seleccioná" {...getInputProps()} />
          <ul {...getMenuProps()}>
            {items.map((item, index) => (
              <li
                className={cx(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "flex flex-col px-3 py-2 shadow-sm",
                )}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <span>{item.valor}</span>
                {/* <span className="text-sm text-gray-700">{item.author}</span> */}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
      {/* <p>{selectedItem && `Seleccionaste ${selectedItem.valor}.`}</p> */}
    </div>
  );
}
