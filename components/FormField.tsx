"use client";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadcnFormField,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { DatePicker } from "./DatePicker";
import { DateRangePicker } from "./DateRangePicker";
import { Textarea } from "./ui/textarea";
import { SelectScroll } from "./SelectScroll";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  isCusutomInput?: boolean;
  className?: string;
  defaultValue?: string;
  unit?: string;
  rows?: number;
}

export function FormField({
  name,
  label,
  form,
  type = "text",
  placeholder,
  autoComplete,
  description,
  children,
  className,
  defaultValue,
  unit,
  rows,
}: FormFieldProps) {
  return (
    <ShadcnFormField
      control={form.control} //
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {/* チルドレンがある場合 */}
            {children ? (
              children
            ) : type === "prefecture" ? (
              <SelectScroll
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                name={name}
                placeholder={placeholder}
                title=""
              />
            ) : type === "date-picker" ? (
              <DatePicker
                disabled={form.formState.isSubmitting}
                selected={field.value}
                onChange={field.onChange}
              />
            ) : type === "range-picker" ? (
              <DateRangePicker
                selected={field.value}
                onChange={field.onChange}
                disabled={form.formState.isSubmitting}
              />
            ) : type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                className={className}
                rows={rows}
                defaultValue={defaultValue}
              />
            ) : (
              <div>
                <Input
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  {...field}
                  type={type}
                  className={cn(className, { "w-auto": unit })}
                  defaultValue={defaultValue}
                />
                {unit && <span className="ml-2 text-gray-500">{unit}</span>}
              </div>
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
