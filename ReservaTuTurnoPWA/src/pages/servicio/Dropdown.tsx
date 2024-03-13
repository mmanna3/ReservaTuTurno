import ReactDropdown, { Option } from "react-dropdown";

interface IProps {
  label: string;
  placeholder?: string;
  options: Option[];
  defaultValue?: Option;
}

export function Dropdown(props: IProps) {
  return (
    <div className="group -my-[0.3rem] mb-7 w-full">
      <label className="relative left-4 top-[1.8rem] z-10 w-auto bg-transparent px-1 text-[12px] text-gray-700 peer-[.is-open]:text-[#32BF8D]">
        {props.label}
      </label>
      <ReactDropdown
        className="group peer h-8 w-full"
        controlClassName="w-full h-16 !border-none !bg-[#F9F9F9] !rounded-xl group-[.is-open]:border group-[.is-open]:border-2 group-[.is-open]:border-[#32BF8D]"
        placeholderClassName="text-base pl-[0.6rem] text-gray-900 absolute top-[1.8rem]"
        menuClassName="absolute !top-[4rem]"
        arrowClassName="absolute !top-[1.9rem] !right-4"
        options={props.options}
        onChange={(a) => console.log(a)}
        value={props.defaultValue}
        placeholder={props.placeholder}
      />
    </div>
  );
}
