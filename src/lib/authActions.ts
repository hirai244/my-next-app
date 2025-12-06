"use server";
import {
  EmailFormValues,
  emailSchema,
  PasswordFormValues,
  passwordSchema,
  SignInFormValues,
  signinSchema,
  SignUpFormValues,
  signupSchema,
} from "@/src/schema/auth";
import { ActionResult } from "@/src/types/shared";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

//ログイン関数
export async function signInAction(
  data: SignInFormValues
): Promise<ActionResult> {
  const supabase = await createClient();
  const validation = signinSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "入力形式が正しくありません。" };
  }
  const { email, password } = validation.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login failed:", error.message);
    return { success: false, message: "認証に失敗しました。" };
  }

  return {
    success: true,
    message: "ログインに成功しました。",
    redirectUrl: "/",
  };
}

// サインアップ関数
export async function signup(data: SignUpFormValues): Promise<ActionResult> {
  const validation = signupSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "入力形式が正しくありません。" };
  }
  const { email, password, role } = validation.data;

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
      emailRedirectTo: `${origin}/auth/callback?next=/profile/setup`,
    },
  });

  if (authError) {
    return {
      success: false,
      message: authError.message || "認証に失敗しました。",
    };
  }
  return {
    success: true,
    message: "確認メールを送信しました。",
    redirectUrl: "/auth/confirm-email",
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/auth/signin");
}

//パスワードリセット関数
export async function sendResetEmailAction(
  data: EmailFormValues
): Promise<ActionResult> {
  const validation = emailSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "入力形式が正しくありません。" };
  }
  const { email } = validation.data;

  const supabase = await createClient();
  const redirectURL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectURL,
  });

  if (error) {
    return { success: false, message: "メール送信に失敗しました。" };
  }
  return { success: true, message: "リセットメールを送信しました。" };
}
//パスワード更新関数

export async function updatePasswordAction(
  data: PasswordFormValues
): Promise<ActionResult> {
  const validation = passwordSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "入力形式が正しくありません。" };
  }
  const { password } = validation.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { success: false, message: "パスワード更新に失敗しました。" };
  }

  return {
    success: true,
    message: "パスワードが正常に更新されました。",
    redirectUrl: "/auth/signin",
  };
}
