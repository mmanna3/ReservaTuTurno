import { Opcion } from "@ui/user-input/autocomplete";

export const convertirEnOpciones = <T extends object>(
  array: T[],
  label: keyof T,
  value: keyof T,
) => {
  return array.map((e) => {
    const option: Opcion = {
      valor: e[label] as unknown as string,
      id: e[value] as unknown as string,
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
  { label: "1:15", value: 75 },
  { label: "1:30", value: 90 },
  { label: "1:45", value: 105 },
  { label: "2 horas", value: 120 },
];

export function getProp(object: any, path: string, defaultValue?: unknown) {
  // Convertir la ruta en un array de claves
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");

  // Iterar sobre las claves para acceder al valor correspondiente en el objeto
  let value = object;
  for (const key of keys) {
    if (value === undefined || value === null) {
      return defaultValue;
    }
    value = value[key];
  }

  // Devolver el valor encontrado o el valor por defecto si no se encuentra
  return value === undefined ? defaultValue : value;
}

export enum DiaDeLaSemana {
  Lunes = 1,
  Martes = 2,
  Miercoles = 4,
  Jueves = 8,
  Viernes = 16,
  Sabado = 32,
  Domingo = 64,
}

export const generarRandom = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

type IconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
  React.RefAttributes<SVGSVGElement>;
type IconProps = IconSVGProps & {
  title?: string;
  titleId?: string;
};

export type Icono = React.FC<IconProps>;
