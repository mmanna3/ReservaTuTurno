import { FieldValues } from "react-hook-form";

interface IArrayProps {
  index: number;
  parentName: string;
}

export interface IFormComponent<T extends FieldValues> {
  name: keyof T;
  array?: IArrayProps;
}
