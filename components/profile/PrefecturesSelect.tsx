"use client";
import React from "react";
import { SelectScrollable } from "../SelectScrollable";
import { PREFECTURE_OPTIONS } from "@/constants/prefectures";
import { Path, UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";
import { SelectItem } from "../ui/select";

interface PrefectureSelectProps {
  form: UseFormReturn<ProfileFormValues>;
  name: Path<ProfileFormValues>;
  // label: string;
  placeholder: string;
  title: string;
}

export function PrefectureSelect({
  form,
  name,
  // label,
  placeholder,
  title,
}: PrefectureSelectProps) {
  return (
    <SelectScrollable
      title={title}
      placeholder={placeholder}
      name={name}
      // label={label}
      form={form}
      className="mb-4"
    >
      {PREFECTURE_OPTIONS.map((pref) => (
        <SelectItem
          key={pref.value || "default"}
          value={pref.value}
          className="cursor-pointer hover:bg-gray-100"
        >
          {pref.label}
        </SelectItem>
      ))}
    </SelectScrollable>
  );
}
