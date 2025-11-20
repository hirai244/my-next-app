"use client";
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
import { PREFECTURE_OPTIONS } from "@/constants/prefectures";
interface SelectScrollProps {
  title: string;
  placeholder: string | undefined;
  label?: string;
  className?: string;
  onChange: (value: string) => void;
  value: string;
  onBlur: () => void;
  name: string;
}
export function SelectScroll({
  title,
  placeholder,
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
          {PREFECTURE_OPTIONS.map((pref) => (
            <SelectItem
              key={pref.value || "default"}
              value={pref.value}
              className="cursor-pointer hover:bg-gray-100"
            >
              {pref.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
