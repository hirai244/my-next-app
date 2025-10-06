"use server";
import { AuthFormValues } from "@/schema/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type AuthResult = { success: true } | { success: false; message: string };

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

// サインアップ関数も書く
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

  redirect("/auth/login");
}
