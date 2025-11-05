"use client";
import React from "react";
import { PREFECTURE_OPTIONS } from "@/constants/prefectures";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { SelectScrollable } from "./SelectScrollable";
import { SelectItem } from "./ui/select";
import { RBBCreateValues } from "@/schema/job";

interface PrefectureScrollProps {
  form: UseFormReturn<RBBCreateValues>;
  name: Path<RBBCreateValues>;
  placeholder: string;
  title: string;
}

export function PrefectureScroll({
  form,
  name,
  placeholder,
  title,
}: PrefectureScrollProps) {
  return (
    <SelectScrollable
      title={title}
      placeholder={placeholder}
      name={name}
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
