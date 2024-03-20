import ReactDropdown, { Option } from "react-dropdown";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

interface IProps<T extends FieldValues> {
  name: keyof T;
  type?: "int" | "string";
  label: string;
  placeholder?: string;
  options: Option[];
  defaultValue?: Option;
  required?: boolean;
  array?: IArrayProps;
}

interface IArrayProps {
  index: number;
  parentName: string;
}

export function Dropdown<T extends FieldValues>({
  required = false,
  type = "string",
  ...props
}: IProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const onChangeFunc = (e: Option) => {
    if (type == "int") return Number(e.value);
    return e.value;
  };

  let fieldName = props.name as string;
  if (props.array)
    fieldName = `${props.array.parentName}.${props.array.index}.${fieldName}`;

  return (
    <>
      <div className="group -my-[0.3rem] mb-7 w-full">
        <label
          className={`relative left-4 top-[1.8rem] z-10 w-auto bg-transparent px-1 text-[12px] text-gris peer-[.is-open]:!text-[#32BF8D] ${
            errors[fieldName] ? "!text-rojo" : ""
          }`}
        >
          {props.label} {required ? "*" : null}
        </label>
        <Controller
          control={control}
          name={fieldName.toString()}
          rules={{ required: required }}
          render={({ field: { onChange, value } }) => (
            <ReactDropdown
              className="group peer h-8 w-full"
              controlClassName="w-full h-16 !border-0 !bg-[#F9F9F9] !rounded-xl group-[.is-open]:!border-2 group-[.is-open]:!border-[#32BF8D]"
              placeholderClassName="text-base pl-[0.6rem] text-negro absolute top-[1.8rem]"
              menuClassName="absolute !top-[4rem] !bg-[#F9F9F9] rounded-xl"
              arrowClassName="absolute !top-[1.9rem] !right-4"
              options={props.options}
              onChange={(e) => onChange(onChangeFunc(e))} // send value to hook form
              // onBlur={onBlur} // notify when input is touched/blur
              value={props.options.find((x) => x.value == value)}
              placeholder={props.placeholder}
            />
          )}
        />
        {errors[fieldName] && errors[fieldName]?.type === "required" && (
          <div className="relative left-3 top-[2rem] text-sm text-rojo">
            Este campo es requerido
          </div>
        )}
      </div>
    </>
  );
}
