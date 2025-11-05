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

type DateRangePickerProps = {
  selected: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  disabled: boolean;
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

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className="w-48 justify-between font-normal"
          >
            期間を選択してください
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={defaultMonth}
            onSelect={onChange}
            selected={selected}
            numberOfMonths={1}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
