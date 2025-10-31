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
import { DatePicker } from "../DatePickerr";
import { DateRangePicker } from "../DateRangePicker";
import { SelectScroll } from "../SelectScroll";

interface FormFieldProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  description?: string;
  children?: React.ReactNode;
  isCusutomInput?: boolean;
  className?: string;
  defaultValue?: string;
  unit?: string;
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
            ) : type === "date-picker" ? (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                disabled={form.formState.isSubmitting}
              />
            ) : type === "range-picker" ? (
              <DateRangePicker
                selected={field.value}
                onChange={field.onChange}
                disabled={form.formState.isSubmitting}
              />
            ) : type === "select" ? (
              <SelectScroll
                title={label}
                placeholder={placeholder}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {children}
              </SelectScroll>
            ) : (
              <div>
                <Input
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  {...field}
                  type={type}
                  className={className}
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
