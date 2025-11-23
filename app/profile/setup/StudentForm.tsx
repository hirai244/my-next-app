"use client";

import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { createProfile } from "@/lib/profileActions";
import { StudentFormValues, studentSchema } from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function StudentForm() {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      university: "",
      bio: "",
      location: "",
    },
  });
  const onSubmit = async (data: StudentFormValues) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("university", data.university);
    formData.append("bio", data.bio || "");

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
          name="fullName"
          label="氏名"
          type="text"
          placeholder="山田 太郎"
        />
        <FormField
          form={form}
          name="university"
          label="大学名"
          type="text"
          placeholder="○○大学"
        />
        <FormField form={form} name="bio" label="自己紹介" type="textarea" />
        <FormField
          label="都道府県"
          name="location"
          form={form}
          type="prefecture"
          placeholder="都道府県を選択"
        />
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
