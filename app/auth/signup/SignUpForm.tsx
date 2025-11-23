"use client";
import React from "react";
import AuthCard from "../AuthCard";
import { Controller, useForm } from "react-hook-form";
import { FormField } from "../../../components/FormField";
import { useRouter } from "next/navigation";
import { AuthFormValues, authSchema } from "@/schema/auth";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signup } from "@/lib/authActions";
import { toast } from "sonner";
import { Spinner } from "../../../components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  const currentRole = form.watch("role");

  console.log("エラー:", form.formState.errors);
  console.log("RHFデータ:", form.getValues());
  const onSubmit = async (data: AuthFormValues) => {
    console.log("送信でーだ", data);
    const result = await signup(data);

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
    toast.success("登録完了", {
      description: "確認メールを送信しました。",
      duration: 5000,
    });
    router.push("/auth/confirm-email");
  };

  return (
    <AuthCard
      title="新規アカウント作成"
      description="登録タイプを選択し、メールアドレスと6文字以上のパスワードを入力してください"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="role"
            render={({ field }) => (
              <div className="mb-6">
                <Tabs
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as "student" | "farmer")
                  }
                  className="grid w-full grid-cols-2 bg-muted p-1"
                >
                  <TabsList>
                    <TabsTrigger
                      value="student"
                      className={cn(
                        "transition-all duration-200",
                        field.value === "student"
                          ? "bg-green-600 text-white shadow-sm hover:bg-green-700"
                          : "hover:bg-accent"
                      )}
                    >
                      学生として登録
                    </TabsTrigger>
                    <TabsTrigger
                      value="farmer"
                      className={cn(
                        "transition-all duration-200",
                        field.value === "farmer"
                          ? "bg-amber-600 text-white shadow-sm hover:bg-amber-700"
                          : "hover:bg-accent"
                      )}
                    >
                      農家として登録
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
          />
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
            className={cn(
              "w-full mt-4 text-white",
              currentRole === "student"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-amber-600 hover:bg-amber-700"
            )}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : "アカウント作成"}
          </Button>
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちですか？{" "}
            <a
              href="/auth/signin"
              className="underline text-primary hover:text-primary/80"
            >
              ログイン
            </a>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
