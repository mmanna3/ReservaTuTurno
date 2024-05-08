import { FieldValues } from "react-hook-form";

interface IArrayProps {
  index: number;
  parentName: string;
}

export interface IFormComponent<T extends FieldValues> {
  name: keyof T;
  array?: IArrayProps;
}

export function obtenerNombreDelCampo<T extends FieldValues>(
  name: keyof T,
  array?: IArrayProps | undefined,
) {
  let fieldName = name as string;
  if (array) fieldName = `${array.parentName}.${array.index}.${name as string}`;
  return fieldName;
}
