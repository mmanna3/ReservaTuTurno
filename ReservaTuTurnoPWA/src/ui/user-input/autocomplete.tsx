import Modal from "@ui/modal";
import cx from "classnames";
import { useState } from "react";
import Input from "./input";
import InputDisplay from "./input-display";

function filtrar(loEscrito: string, opciones: Opcion[]) {
  const enMinuscula = loEscrito.toLowerCase();

  return opciones.filter((o) => o.valor.toLowerCase().includes(enMinuscula));
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
  const [isOpen, setIsOpen] = useState(false);

  const onInputFiltroChange = (e: React.FormEvent<HTMLInputElement>) => {
    const textoIngresado = e.currentTarget.value;
    const itemsFiltrados = filtrar(textoIngresado, props.opciones);
    setItems(itemsFiltrados);
  };

  const onOpcionClick = (opcion: Opcion) => {
    setSelectedItem(opcion);
    setIsOpen(false);
  };

  const onInputClick = () => {
    setIsOpen(true);
    setItems(props.opciones);
  };

  return (
    <div>
      <div>
        <div>
          <InputDisplay
            onClick={onInputClick}
            label="El nombre del campo"
            hayError={false}
          >
            <>{selectedItem ? selectedItem.valor : "."}</>
          </InputDisplay>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="h-80 w-80">
          <Input label="Buscar" onChange={onInputFiltroChange} />
          <ul className="mt-6">
            {items.map((item) => (
              <li
                className={cx(
                  selectedItem === item && "bg-rosa font-medium text-blanco",
                  "flex cursor-pointer flex-col border-b px-4 py-4",
                )}
                key={item.id}
                onClick={() => onOpcionClick(item)}
              >
                <span>{item.valor}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
