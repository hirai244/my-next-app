"use client";

import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { createProfile } from "@/lib/profileActions";
import {
  FarmerFormValues,
  farmerSchema,
  StudentFormValues,
} from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function FarmerForm() {
  const form = useForm<FarmerFormValues>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      farmName: "",
      location: "",
      description: "",
    },
  });
  const onSubmit = async (data: FarmerFormValues) => {
    const formData = new FormData();
    formData.append("farmName", data.farmName);
    formData.append("location", data.location);
    formData.append("description", data.description || "");

    const result = await createProfile(formData);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("登録完了");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          form={form}
          name="farmName"
          label="農園名"
          type="text"
          placeholder=""
        />
        <FormField
          label="都道府県"
          name="location"
          form={form}
          type="prefecture"
          placeholder="都道府県を選択"
        />
        <FormField form={form} name="bio" label="自己紹介" type="textarea" />
        <Button
          type="submit"
          className="w-full mt-6"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <Spinner /> : "登録"}
        </Button>
      </form>
    </Form>
  );
}
