"use client";
import AuthCard from "../AuthCard";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SignInFormValues, signinSchema } from "@/src/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/FormField";
import { Button } from "@/src/components/ui/button";
import { Form } from "@/src/components/ui/form";
import { toast } from "sonner";
import { signInAction } from "@/src/lib/authActions";
import { Loader2 } from "lucide-react";
import { Sign } from "crypto";

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const OnSubmit = async (data: SignInFormValues) => {
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

    toast.success(result.message, {
      duration: 4000,
    });
    router.refresh();
    if (result.redirectUrl) {
      router.push(result.redirectUrl);
    }
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
            autoComplete="email"
          />
          <FormField
            form={form}
            name="password"
            label="パスワード"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            description="8文字以上で大文字を含む半角英数字と記号を含めてください。"
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
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" /> ログイン中...
              </span>
            ) : (
              "ログイン"
            )}
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
