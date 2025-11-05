import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
type DatePickerProps = {
  selected: Date | undefined; //mode=singleならDateオブジェクト rangeならDateRange
  disabled: boolean;
  onChange: (date: Date | undefined) => void;
};

export function DatePicker({ selected, disabled, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className="w-48 justify-between font-normal"
          >
            {selected ? format(selected, "yyyy/MM/dd") : "日付を選択"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            captionLayout="dropdown"
            onSelect={(date: Date | undefined) => {
              onChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
