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
