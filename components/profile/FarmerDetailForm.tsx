"use client";
import React from "react";
import { FormField } from "../forms/FormField";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/schema/profile";
import { PrefectureSelect } from "./PrefecturesSelect";
import AnimatePageWrapper from "../motion/AnimatePageWrapper";
type DetailFormProps = {
  form: UseFormReturn<ProfileFormValues>;
};

export function FarmerDetailForm({ form }: DetailFormProps) {
  return (
    <AnimatePageWrapper>
      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
        <FormField
          form={form}
          name="farmName"
          label="農園名"
          type="text"
          placeholder=""
          description="正式名称を入力してください"
          autoComplete="off"
        />
        <FormField form={form} name="location" label="所在地">
          <PrefectureSelect
            form={form}
            name="location"
            title="都道府県"
            placeholder="都道府県を選択してください"
          />
        </FormField>
        {/* <FormField
          form={form}
          name="mainCrops"
          label="主作物"
          type="textarea"
          placeholder=""
        /> */}
      </div>
    </AnimatePageWrapper>
  );
}
