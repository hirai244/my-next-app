"use client";
import React from "react";
import { SelectScrollable } from "../SelectScrollable";
import { PREFECTURE_OPTIONS } from "@/constants/prefectures";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";
import { SelectItem } from "../ui/select";

interface PrefectureSelectProps {
  form: UseFormReturn<ProfileFormValues>;
  name: keyof ProfileFormValues;
  label: string;
  placeholder: string;
}

export function PrefectureSelect({
  form,
  name,
  label,
  placeholder,
}: PrefectureSelectProps) {
  return (
    <SelectScrollable
      title="都道府県"
      placeholder={placeholder}
      name={name}
      label={label}
      form={form}
    >
      {PREFECTURE_OPTIONS.map((pref) => (
        <SelectItem key={pref.value || "default"} value={pref.value}>
          {pref.label}
        </SelectItem>
      ))}
    </SelectScrollable>
  );
}
