"use client";
import React from "react";
import { FormField } from "../forms/FormField";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";
type DetailStudentProps = {
  form: UseFormReturn<ProfileFormValues>;
};

export function StudentDetailForm({ form }: DetailStudentProps) {
  return (
    <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
      <FormField
        form={form}
        name="university"
        label="大学名"
        type="text"
        placeholder=""
        description="正式名称を入力してください"
      />
      <FormField
        form={form}
        name="major"
        label="学部・専攻"
        type="text"
        placeholder=""
      />
      <FormField form={form} name="researchTopic" label="研究テーマ" />
      <FormField
        form={form}
        name="bio"
        label="自己紹介"
        type="textarea"
        placeholder=""
      />
    </div>
  );
}
export default StudentDetailForm;
