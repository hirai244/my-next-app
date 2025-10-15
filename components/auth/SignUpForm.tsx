"use client";
import React from "react";
import AuthCard from "./AuthCard";
import { useForm } from "react-hook-form";
import { FormField } from "../forms/FormField";
import { useRouter } from "next/navigation";
import { AuthFormValues, authSchema } from "@/schema/auth";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/lib/authActions";
import { toast } from "sonner";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    const result = await signUpAction(data);

    if (!result.success) {
      toast.error(result.message, {
        description: "入力内容をご確認ください。",
      });
      //ルートエラーの設定
      form.setError("root.serverError", {
        type: "manual",
        message: result.message,
      });
      //処理の中断
      return;
    }
    toast.success("登録完了", {
      description: "確認メールを送信しました。",
      duration: 5000,
    });
    router.push("/auth/confirm-email");
  };

  return (
    <AuthCard
      title="新規アカウント作成"
      description="メールアドレスと6文字以上のパスワードを入力してください"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-4">
          <FormField
            form={form}
            name="email"
            label="メールアドレス"
            type="email"
            placeholder="example@mail.com"
          />
          <FormField
            form={form}
            name="password"
            label="パスワード"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••" //あとで
            description="8文字以上の半角英数字記号を含めてください"
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
            {form.formState.isSubmitting ? "登録中..." : "アカウント作成"}
          </Button>
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちですか？{" "}
            <a href="/auth/signin" className="underline">
              ログイン
            </a>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}

export default SignUpForm;
