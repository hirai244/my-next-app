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

interface FormFieldProps {
  name: string;
  label: string;
  form: UseFormReturn<any>; //
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  description?: string;
  children?: React.ReactNode;
  isCusutomInput?: boolean;
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
            ) : (
              <Input
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...field}
                type={type}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
