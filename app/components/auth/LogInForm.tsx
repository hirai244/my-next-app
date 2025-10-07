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
import { toast } from "sonner";

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
      toast.error(result.message, {
        description: "入力内容をご確認ください。",
      });
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
      description="登録済みのメールアドレスとパスワードを入力してください" //消すか？
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
          <FormField
            form={form}
            name="email"
            label="メールアドレス"
            type="email"
            placeholder="example@mail.com"
            autoComplete="email"
          />
          <FormField
            form={form}
            name="password"
            label="パスワード"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
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
            <br />
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}

export default LogInForm;
