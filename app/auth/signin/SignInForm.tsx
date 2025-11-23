"use client";
import AuthCard from "../AuthCard";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  AuthFormValues,
  authSchema,
  LoginFormValues,
  loginSchema,
} from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAction } from "@/lib/authActions";
import { FormField } from "../../../components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Spinner } from "../../../components/ui/spinner";

export function SignInForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const OnSubmit = async (data: LoginFormValues) => {
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
    toast.success("ログイン成功", {
      duration: 5000,
    });

    router.refresh();
    router.push("/"); //認証後のページ
  };
  // const onInvalid = (errors: any) => {
  //   console.log("バリデーションエラーが発生しています:", errors);
  //   toast.error("入力内容に不備があります");
  // };

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
          <a
            href="/auth/forget-password"
            className="text-primary hover:text-primary/80"
          >
            パスワードをお忘れですか？
          </a>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : "ログイン"}
          </Button>
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちではありませんか？{" "}
            <a
              href="/auth/signup"
              className="underline text-primary hover:text-primary/80"
            >
              新規登録
            </a>
            <br />
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
