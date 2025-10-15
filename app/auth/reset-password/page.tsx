"use client";
import AuthCard from "@/components/auth/AuthCard";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updatePasswordAction } from "@/lib/authActions";
import { PasswordFormValues, passwordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function resetPasswordPage() {
  const router = useRouter();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });
  //try catch文で
  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await updatePasswordAction(data);
      toast.success("パスワードが正常に更新されました。", {
        description: "新規パスワードでログインしてください。",
      });

      router.push("/auth/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "パスワードの更新に失敗しました。";
      toast.error("更新失敗", {
        description: errorMessage,
      });

      form.setError("root.serverError", {
        type: "manual",
        message: errorMessage,
      });
    }
  };
  return (
    <AuthCard
      title="パスワードの再設定"
      description="新しいパスワードを入力してください。"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="password"
            label="パスワード"
            form={form}
            type="password"
            placeholder="extha"
          />
          {form.formState.errors.root?.serverError && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "送信中" : "送信"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
