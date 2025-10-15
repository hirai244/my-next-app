"use client";
import React from "react";
import { FormField } from "../forms/FormField";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";
type DetailFormProps = {
  form: UseFormReturn<ProfileFormValues>;
};

export function FarmerDetailForm({ form }: DetailFormProps) {
  return (
    <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
      <FormField
        form={form}
        name="farmName"
        label="農園名"
        type="text"
        placeholder=""
        description="正式名称を入力してください"
      />
      <FormField
        form={form}
        name="location"
        label="所在地"
        type="text"
        placeholder=""
      />
      <FormField form={form} name="researchTopic" label="研究テーマ" />
      <FormField
        form={form}
        name="mainCrops"
        label="主作物"
        type="textarea"
        placeholder=""
      />
    </div>
  );
}
export default FarmerDetailForm;
