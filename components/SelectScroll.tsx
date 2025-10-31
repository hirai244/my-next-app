"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SelectScrollProps {
  title: string;
  placeholder: string | undefined;
  children: React.ReactNode;
  label?: string;
  className?: string;
  onChange: (value: string) => void;
  value: string;
  onBlur: () => void;
}
export function SelectScroll({
  title,
  placeholder,
  children,
  onBlur,
  onChange,
  value,
}: SelectScrollProps) {
  return (
    <Select onValueChange={onChange} value={value} onOpenChange={onBlur}>
      <SelectTrigger className="w-full">
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
