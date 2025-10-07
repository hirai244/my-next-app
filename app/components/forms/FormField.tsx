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
}

export function FormField({
  name,
  label,
  form,
  type = "text",
  placeholder,
  autoComplete,
  description,
}: FormFieldProps) {
  return (
    <ShadcnFormField
      control={form.control} //
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              autoComplete={autoComplete}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
