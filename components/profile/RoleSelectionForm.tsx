"use client";
import { FormField } from "../forms/FormField";
import { Controller, UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { motion } from "framer-motion";

type RoleSelectionProps = {
  form: UseFormReturn<ProfileFormValues>;
  onRoleSelect: (role: "farmer" | "student") => void;
};

export function RoleSelectionForm({ form, onRoleSelect }: RoleSelectionProps) {
  const selectRole = form.watch("role");

  const MotionToggleGroupItem = motion(ToggleGroupItem);

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
            <MotionToggleGroupItem
              value="farmer"
              aria-label="農家を選択"
              className="py-4  text-center data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">農家</span>
            </MotionToggleGroupItem>
            <MotionToggleGroupItem
              value="student"
              aria-label="学生を選択"
              className="py-4 text-center data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">学生</span>
            </MotionToggleGroupItem>
          </ToggleGroup>
        )}
      />
    </FormField>
  );
}
