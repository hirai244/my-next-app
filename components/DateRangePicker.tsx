import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

type DateRangePickerProps = {
  selected: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  disabled?: boolean;
  defaultMonth?: Date;
  className?: string;
};

export function DateRangePicker({
  onChange,
  selected,
  disabled,
  defaultMonth,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  // const handleSelect = (date: DateRange | undefined) => {
  //   onChange(date);
  //   if (date && date.from && date.to) {
  //     setOpen(false);
  //   }
  // };
  const buttonText = React.useMemo(() => {
    if (!selected?.from) {
      return "期間を選択してください";
    }
    if (selected.to) {
      return `${format(selected.from, "yyyy/MM/dd")} 〜 ${format(
        selected.to,
        "yyyy/MM/dd"
      )}`;
    }
    return format(selected.from, "yyyy/MM/dd") + "を選択中";
  }, [selected]);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className="w-48 justify-between font-normal"
          >
            {buttonText}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={defaultMonth}
            onSelect={(date: DateRange | undefined) => {
              onChange(date);
            }}
            selected={selected}
            numberOfMonths={1}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
