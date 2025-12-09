"use client";
import React from "react";
import AuthCard from "../AuthCard";
import { Controller, useForm } from "react-hook-form";
import { FormField } from "../../../components/FormField";
import { useRouter } from "next/navigation";
import { Form } from "@/src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { cn } from "@/src/lib/utils";
import { signup } from "@/src/lib/authActions";
import { SignUpFormValues, signupSchema } from "@/src/schema/auth";
import { GraduationCap, Loader2, Tractor } from "lucide-react";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  const currentRole = form.watch("role");

  const onSubmit = async (data: SignUpFormValues) => {
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
    router.refresh();
    if (result.redirectUrl) {
      router.push(result.redirectUrl);
    }
  };

  return (
    <AuthCard
      title="新規アカウント作成"
      description="登録タイプを選択し、メールアドレスとパスワードを入力してください"
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
                  className="w-full "
                >
                  <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-gray-100/80 rounded-xl">
                    <TabsTrigger
                      value="student"
                      className={cn(
                        "transition-all duration-200",
                        field.value === "student"
                          ? "bg-green-600  shadow-sm "
                          : "hover:bg-accent"
                      )}
                    >
                      <GraduationCap className="w-5 h-5" />
                      学生
                    </TabsTrigger>
                    <TabsTrigger
                      value="farmer"
                      className={cn(
                        "transition-all duration-200 ",
                        field.value === "farmer"
                          ? "bg-amber-600  shadow-sm hover:bg-amber-700"
                          : "hover:bg-accent"
                      )}
                    >
                      <Tractor className="w-5 h-5" />
                      農家
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
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" /> 作成中...
              </span>
            ) : (
              "アカウント作成"
            )}
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
