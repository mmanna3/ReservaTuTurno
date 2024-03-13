import { Option } from "react-dropdown";

export const convertirEnOptions = <T extends object>(
  array: T[],
  label: keyof T,
  value: keyof T,
) => {
  return array.map((e) => {
    const option: Option = {
      label: e[label] as unknown as string,
      value: e[value] as unknown as string,
      className: "text-base !text-gray-900 h-11 border-b",
    };
    return option;
  });
};

export interface IDuracionDelServicio {
  label: string;
  value: number;
}

export const DuracionDelServicioArray: IDuracionDelServicio[] = [
  { label: "15 minutos", value: 15 },
  { label: "30 minutos", value: 30 },
  { label: "45 minutos", value: 45 },
  { label: "1 hora", value: 60 },
  { label: "1 hora y cuarto", value: 75 },
  { label: "1 hora y media", value: 90 },
  { label: "1 hora y 45 minutos", value: 105 },
  { label: "2 horas", value: 120 },
];
