import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Modal from "@ui/modal";
import cx from "classnames";
import { useEffect, useState } from "react";
import { Icono } from "src/utilidades";
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

export interface IAutocompleteProps {
  label: string;
  placeholder?: string;
  opciones: Opcion[];
  defaultValue?: Opcion;
  required?: boolean;
  Icono?: Icono;
  onOpcionSeleccionada?: (arg: Opcion) => void;
  onLimpiar?: () => void;
  hayError?: boolean;
  valorDefault?: Opcion;
}

export default function Autocomplete(props: IAutocompleteProps) {
  const { valorDefault } = props;

  const [items, setItems] = useState(props.opciones);
  const [selectedItem, setSelectedItem] = useState<Opcion | null>(
    valorDefault || null,
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedItem(valorDefault || null);
  }, [props.opciones, valorDefault]);

  const limpiar = () => {
    props.onLimpiar && props.onLimpiar();
    setItems(props.opciones);
    setSelectedItem(null);
    setIsOpen(false);
  };

  const onInputFiltroChange = (e: React.FormEvent<HTMLInputElement>) => {
    const textoIngresado = e.currentTarget.value;
    const itemsFiltrados = filtrar(textoIngresado, props.opciones);
    setItems(itemsFiltrados);
  };

  const onOpcionClick = (opcion: Opcion) => {
    props.onOpcionSeleccionada && props.onOpcionSeleccionada(opcion);
    setSelectedItem(opcion);
    setIsOpen(false);
  };

  const onInputClick = () => {
    setIsOpen(true);
    setItems(props.opciones);
  };

  return (
    <div>
      <InputDisplay
        onClick={onInputClick}
        label={props.label}
        hayError={false}
        esRequerido={props.required}
      >
        {selectedItem ? (
          <span className="h-6">{selectedItem.valor}</span>
        ) : (
          <span className="h-6 text-grisclaro">{props.placeholder}</span>
        )}

        {props.Icono ? (
          <div className="bg-grisclaro/12 absolute right-4 top-4 rounded-lg p-2 shadow-sm">
            <props.Icono className="size-5 stroke-[1.8px] text-rosa" />
          </div>
        ) : (
          <div className="bg-grisclaro/12 absolute right-4 top-4 rounded-lg p-2 shadow-sm">
            <ChevronDownIcon className="size-5 stroke-[1.8px] text-rosa" />
          </div>
        )}
      </InputDisplay>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="h-82 w-64">
          <Input
            tabIndex={-1}
            label="Buscar"
            onChange={onInputFiltroChange}
            Icono={MagnifyingGlassIcon}
          />
          {items.length ? (
            <ul className="mt-6 h-48 overflow-y-auto">
              {items.map((item) => (
                <li
                  className={cx(
                    selectedItem === item &&
                      "rounded-xl bg-rosa font-medium tracking-wide text-blanco",
                    "flex cursor-pointer flex-col border-b px-4 py-4 last:border-0",
                  )}
                  key={item.id}
                  onClick={() => onOpcionClick(item)}
                >
                  <span>{item.valor}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="ml-3 mt-6 text-gris">
              No hay opciones disponibles
            </div>
          )}
          <div className="flex justify-end">
            <button
              tabIndex={-1}
              onClick={limpiar}
              type="button"
              className="mt-4 flex p-2 text-xs text-rosaoscuro underline"
            >
              Limpiar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
