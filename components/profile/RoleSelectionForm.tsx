"use client";
import { FormField } from "../forms/FormField";
import { Controller, UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type RoleSelectionProps = {
  form: UseFormReturn<ProfileFormValues>;
  onRoleSelect: (role: "farmer" | "student") => void;
};

export function RoleSelectionForm({ form, onRoleSelect }: RoleSelectionProps) {
  const selectRole = form.watch("role");

  return (
    <FormField name="role" label="" form={form}>
      <Controller
        name="role"
        control={form.control}
        render={({ field }) => (
          <ToggleGroup
            type="single"
            value={field.value}
            onValueChange={(value) => {
              if (value) {
                field.onChange(value);
                onRoleSelect(value as "farmer" | "student");
              }
            }}
            className="grid w-full grid-cols-2 gap-2"
          >
            <ToggleGroupItem
              value="farmer"
              aria-label="農家を選択"
              className="py-4  text-center data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <span className="font-medium">農家</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="student"
              aria-label="学生を選択"
              className="py-4 text-center data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <span className="font-medium">学生</span>
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      />
    </FormField>
  );
}
