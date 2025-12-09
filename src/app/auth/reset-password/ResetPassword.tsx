"use client";
import { PasswordFormValues, passwordSchema } from "@/src/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthCard from "../AuthCard";
import { Form } from "../../../components/ui/form";
import { FormField } from "../../../components/FormField";
import { Button } from "../../../components/ui/button";
import { updatePasswordAction } from "@/src/lib/authActions";
import { Loader2 } from "lucide-react";

export function ResetPassword() {
  const router = useRouter();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    const result = await updatePasswordAction(data);
    if (!result.success) {
      toast.error("更新失敗", {
        description: result.message,
      });
      form.setError("root.serverError", {
        type: "manual",
        message: result.message,
      });
      return;
    }
    toast.success("パスワードを更新しました。", {
      description: "ログインしてください。",
    });
    if (result.redirectUrl) {
      router.push(result.redirectUrl);
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
            placeholder="新しいパスワードを入力してください"
          />
          {form.formState.errors.root?.serverError && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" /> 登録中...
              </span>
            ) : (
              "パスワードを更新する"
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
