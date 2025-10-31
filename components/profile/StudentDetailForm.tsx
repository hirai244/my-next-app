"use client";
import React from "react";
import { FormField } from "../forms/FormField";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";
import AnimatePageWrapper from "../motion/AnimatePageWrapper";
type DetailStudentProps = {
  form: UseFormReturn<ProfileFormValues>;
};

export function StudentDetailForm({ form }: DetailStudentProps) {
  return (
    <AnimatePageWrapper>
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
          description=""
        />
        <FormField
          form={form}
          name="bio"
          label="自己紹介"
          type="textarea"
          placeholder=""
        />
      </div>
    </AnimatePageWrapper>
  );
}
export default StudentDetailForm;
