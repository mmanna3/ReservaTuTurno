import { es } from "date-fns/locale";
import { useState } from "react";
import { DayPicker, DayPickerDefaultProps, Matcher } from "react-day-picker";

export interface IDayPicker {
  valor: unknown;
  label?: string;
  required?: boolean;
  hayError: boolean;
  diasDisponibles: Date[];
  onChange?: (arg: Date) => void;
}

function SelectorDia(props: IDayPicker) {
  const [selected, setSelected] = useState<Date | undefined>();

  const handleSelect = (diaSeleccionado: Date | undefined) => {
    if (
      diaSeleccionado &&
      props.diasDisponibles.find(
        (x) => x.getTime() === diaSeleccionado.getTime(),
      )
    ) {
      setSelected(diaSeleccionado);
      props.onChange && props.onChange(diaSeleccionado);
    }
  };

  const functionMatcher: Matcher = (day: Date) => {
    const dateSet = new Set(props.diasDisponibles.map((d) => d.getTime()));
    return !dateSet.has(day.getTime());
  };

  return (
    <div className="mt-14 flex justify-center">
      <DayPicker
        classNames={classNames}
        mode="single"
        locale={es}
        selected={selected}
        onSelect={handleSelect}
        modifiers={{ disabled: functionMatcher }}
        modifiersStyles={{
          selected: { background: "#DA7DA3" },
        }}
      />
    </div>
  );
}

const classNames: DayPickerDefaultProps["classNames"] = {
  //   vhidden: "sr-only",
  //   caption: "flex justify-center items-center h-10",
  //   root: "text-gray-800",
  //   months: "flex gap-4 relative px-4",
  //   caption_label: "text-xl px-1",
  //   nav_button:
  //     "inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100",
  //   nav_button_next: "right-0",
  //   nav_button_previous: "left-0",
  //   table: "border-collapse border-spacing-0",
  //   head_cell: "w-10 h-10 uppercase align-middle text-center",
  //   cell: "w-10 h-10 align-middle text-center border-0 px-0",
  //   day: "rounded-full w-10 h-10 transition-colors hover:bg-red-100 focus:outline-none focus-visible:ring focus-visible:ring-red-300 focus-visible:ring-opacity-50 active:bg-red-600 active:text-white",
  //   day: "hover:bg-red-100",
  day_selected: "text-white bg-rosa hover:bg-rosa-oscuro",
  //   day_today: "font-bold",
  //   day_disabled:
  //     "opacity-25 hover:bg-white active:bg-white active:text-gray-800",
  //   day_outside: "enabled:opacity-50",
  //   day_range_middle: "rounded-none",
  //   day_range_end: "rounded-l-none rounded-r-full",
  //   day_range_start: "rounded-r-none rounded-l-full",
  //   day_hidden: "hidden",
};

export default SelectorDia;
