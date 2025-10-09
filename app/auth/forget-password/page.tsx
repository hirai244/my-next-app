"use client";
import AuthCard from "@/app/components/auth/AuthCard";
import { FormField } from "@/app/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { sendPasswordResetEmailAction } from "@/lib/authActions";
import { EmailFormValues, emailSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function () {
  const router = useRouter();

  //バリデート
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    const result = await sendPasswordResetEmailAction(data);
    if (!result.success) {
      toast.error(result.message, {
        description: "入力内容をご確認ください。",
      });
      //サーバー側のエラー
      form.setError("root.serverError", {
        type: "manual",
        message: result.message,
      });
      return;
    }
    toast.success("リセットメールを送信しました。", {
      description: "メールボックスをご確認ください。",
    });
    form.reset();

    router.push("/auth/confirm-reset-email");
  };

  return (
    <AuthCard title="再設定" description="メールアドレスを入力してください。">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            form={form}
            name="email"
            label="メールアドレス"
            type="email"
            placeholder="example@mail.com"
            autoComplete="email"
          />
          {form.formState.errors.root?.serverError && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "送信中..." : "送信"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
