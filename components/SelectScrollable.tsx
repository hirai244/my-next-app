import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
interface SelectScrollableProps {
  title: string;
  placeholder: string;
  children: React.ReactNode;
  form: UseFormReturn<any>;
  name: string;
  label: string;
}
export function SelectScrollable({
  title,
  placeholder,
  children,
}: SelectScrollableProps) {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
