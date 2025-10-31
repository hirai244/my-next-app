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
import StudentDetailForm from "./StudentDetailForm";
import AuthCard from "../auth/AuthCard";
import { FarmerDetailForm } from "./FarmerDetailForm";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function ProfileSetupForm() {
  const router = useRouter();

  const [selectRole, setSelectRole] = useState<"farmer" | "student" | null>(
    "farmer"
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSetupSchema),
    mode: "onBlur",
    defaultValues: {
      role: "farmer",
      farmName: "",
      location: "",
      university: "",
      major: "",
      bio: "",
    } as ProfileFormValues,
  });
  // const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
  //   const result = await createProfile(data);

  //   if (result.success) {
  //     toast.success("成功", { description: "ご登録ありがとうございます" });
  //   } else {
  //     toast.error(result.message);
  //   }
  // };
  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      await createProfile(data);
      toast.success("登録完了。ページを移動します。", { duration: 2000 });
      router.push("/");
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "予期せぬエラーが発生しました。";
      toast.error("プロファイル登録中にエラーが発生しました。", {
        description: errorMessage,
      });
    }
  };

  const MotionButton = motion(Button);

  return (
    <AuthCard
      title="プロフィール登録"
      description="当てはまる方を選択し記入してください"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <RoleSelectionForm form={form} onRoleSelect={setSelectRole} />
          {selectRole && (
            <div>
              {selectRole === "farmer" && <FarmerDetailForm form={form} />}
              {selectRole === "student" && <StudentDetailForm form={form} />}

              <MotionButton
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {form.formState.isSubmitting ? "登録中..." : "登録"}
              </MotionButton>
            </div>
          )}
        </form>
      </Form>
    </AuthCard>
  );
}
