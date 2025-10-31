"use server";
import {
  AuthFormValues,
  EmailFormValues,
  PasswordFormValues,
} from "@/schema/auth";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";
import { redirect } from "next/navigation";

type AuthResult = { success: true } | { success: false; message: string };

//ログイン関数
export async function signInAction(data: AuthFormValues): Promise<AuthResult> {
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
export async function signUpAction(data: AuthFormValues): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { success: false, message: error.message };
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
): Promise<AuthResult> {
  const supabase = await createClient();

  const redirectURL = "${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password";

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: redirectURL,
  });

  if (error) {
    console.log(error); //
  }

  redirect("/auth/signin"); //
}

//パスワード更新関数

export async function updatePasswordAction(
  data: PasswordFormValues
): Promise<AuthResult> {
  const newPassword = data.password;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error("パスワードの更新に失敗しました。再度お試しください。");
  }
  redirect("/");
}
