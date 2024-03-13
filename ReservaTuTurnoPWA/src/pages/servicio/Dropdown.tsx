import ReactDropdown, { Option } from "react-dropdown";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

interface IProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  placeholder?: string;
  options: Option[];
  defaultValue?: Option;
  required?: boolean;
}

export function Dropdown<T extends FieldValues>({
  required = false,
  ...props
}: IProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="group -my-[0.3rem] mb-7 w-full">
        <label
          className={`relative left-4 top-[1.8rem] z-10 w-auto bg-transparent px-1 text-[12px] text-gray-700 peer-[.is-open]:!text-[#32BF8D] ${
            errors[props.name as string] ? "!text-red-600" : ""
          }`}
        >
          {props.label}
        </label>
        <Controller
          control={control}
          name={props.name.toString()}
          rules={{ required: required }}
          render={({ field: { onChange, value } }) => (
            <ReactDropdown
              className="group peer h-8 w-full"
              controlClassName="w-full h-16 !border-0 !bg-[#F9F9F9] !rounded-xl group-[.is-open]:!border-2 group-[.is-open]:!border-[#32BF8D]"
              placeholderClassName="text-base pl-[0.6rem] text-gray-800 absolute top-[1.8rem]"
              menuClassName="absolute !top-[4rem] !bg-[#F9F9F9] rounded-xl"
              arrowClassName="absolute !top-[1.9rem] !right-4"
              options={props.options}
              onChange={(e) => onChange(e.value)} // send value to hook form
              // onBlur={onBlur} // notify when input is touched/blur
              value={value}
              placeholder={props.placeholder}
            />
          )}
        />
        {errors[props.name as string] &&
          errors[props.name]?.type === "required" && (
            <div className="relative left-3 top-[2rem] text-sm text-red-600">
              Este campo es requerido
            </div>
          )}
      </div>
    </>
  );
}
