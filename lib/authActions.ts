"use server";
import {
  AuthFormValues,
  EmailFormValues,
  PasswordFormValues,
} from "@/schema/auth";
import { ActionResult } from "@/schema/shared";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

//ログイン関数
export async function signInAction(
  data: AuthFormValues
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { success: false, message: "認証に失敗しました。" };
  }

  return { success: true };
}

// サインアップ関数
export async function signUpAction(
  data: AuthFormValues
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { success: false, message: "認証に失敗しました。" };
  }

  return { success: true };
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
  const supabase = await createClient();

  const redirectURL = "${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password";

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: redirectURL,
  });

  if (error) {
    return { success: false, message: "メール送信に失敗しました。" };
  }

  redirect("/auth/signin"); //
}

//パスワード更新関数

export async function updatePasswordAction(
  data: PasswordFormValues
): Promise<ActionResult> {
  const newPassword = data.password;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { success: false, message: "パスワード更新に失敗しました。" };
  }
  redirect("/");
}
