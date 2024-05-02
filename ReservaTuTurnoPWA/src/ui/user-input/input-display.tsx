import cx from "classnames";
import { ReactNode } from "react";

interface IProps {
  label: string;
  esRequerido?: boolean;
  hayError: boolean;
  onClick?: (x: unknown) => void;
  children: ReactNode;
}

export default function InputDisplay(props: IProps) {
  return (
    <div
      className="group relative mt-5 w-full rounded-xl bg-[#F9F9F9] p-2"
      onClick={props.onClick}
    >
      <label
        className={cx(
          "relative ml-1 w-auto bg-transparent px-1 text-[12px] text-gris peer-[.is-open]:!text-[#32BF8D]",
          props.hayError ? "!text-rojo" : "",
        )}
      >
        {props.label} {props.esRequerido ? "*" : null}
      </label>
      <div className="ml-2 flex">{props.children}</div>
    </div>
  );
}
