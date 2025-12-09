import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { format, set } from "date-fns";
import { useState } from "react";

type DatePickerProps = {
  selected: Date | undefined;
  disabled: boolean;
  onChange: (date: Date | undefined) => void;
};

export function DatePicker({ selected, disabled, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

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
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
