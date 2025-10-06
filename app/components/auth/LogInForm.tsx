"use client";
import AuthCard from "./AuthCard";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AuthFormValues, authSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAction } from "@/lib/authActions";
import { FormField } from "../forms/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export function LogInForm() {
  const router = useRouter(); //後で確認

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const OnSubmit = async (data: AuthFormValues) => {
    const result = await signInAction(data);

    if (!result.success) {
      form.setError("root.serverError", {
        type: "manual",
        message: result.message,
      });
      return;
    }

    router.refresh();
    router.push("/"); //認証後
  };

  return (
    <AuthCard
      title="ログイン"
      description="登録済みのメールアドレスとパスワードを入力してください"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
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
            placeholder="••••••••"
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
            {form.formState.isSubmitting ? "ログイン中..." : "ログイン"}
          </Button>
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちではありませんか？{" "}
            <a href="/auth/signup" className="underline">
              新規登録
            </a>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}

export default LogInForm;
