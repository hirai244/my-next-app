"use client";

import { createProfile } from "@/lib/profileActions";
import { ProfileFormValues, profileSetupSchema } from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { RoleSelectionForm } from "./RoleSelectionForm";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FarmerDetailForm from "./FarmerDetailForm";
import StudentDetailForm from "./StudentDetailForm";
import AuthCard from "../auth/AuthCard";

export function ProfileSetupForm({ userId }: { userId: string }) {
  const [selecteRole, setSelectRole] = useState<"farmer" | "student" | null>(
    null
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSetupSchema),
    mode: "onBlur",
    defaultValues: {
      role: "farmer",
      farmName: "",
      location: "",
      mainCrops: [],
      description: "",
      university: "",
      major: "",
      researchTopic: "",
      bio: "",
    } as ProfileFormValues,
  });
  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    const result = await createProfile(data);

    if (result.success) {
      toast.success("", { description: "" });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AuthCard title="" description="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!selecteRole && (
            <RoleSelectionForm form={form} onRoleSelect={setSelectRole} />
          )}

          {selecteRole && (
            <div>
              {selecteRole === "farmer" && <FarmerDetailForm form={form} />}
              {selecteRole === "student" && <StudentDetailForm form={form} />}

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                登録
              </Button>
            </div>
          )}
        </form>
      </Form>
    </AuthCard>
  );
}
