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
import { UseFormReturn, Controller } from "react-hook-form";
interface SelectScrollableProps {
  title: string;
  placeholder: string;
  children: React.ReactNode;
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  className?: string;
}
export function SelectScrollable({
  title,
  placeholder,
  children,
  form,
  name,
  label,
  className,
}: SelectScrollableProps) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          value={field.value}
          onOpenChange={field.onBlur}
        >
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
      )}
    />
  );
}
