"use server";
import {
  AuthFormValues,
  EmailFormValues,
  LoginFormValues,
  PasswordFormValues,
} from "@/schema/auth";
import { ActionResult } from "@/schema/shared";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface SignUpData extends AuthFormValues {
  role: "farmer" | "student";
}

//ログイン関数
export async function signInAction(
  data: LoginFormValues
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
export async function signup(data: SignUpData): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        role: data.role,
      },
    },
  });

  if (authError) {
    return {
      success: false,
      message: authError.message || "認証に失敗しました。",
    };
  }
  const userId = authData.user?.id;

  if (userId) {
    let profileError;
    if (data.role === "student") {
      // studentsテーブルに挿入
      const { error } = await supabase.from("students").insert({
        id: userId,
        email: data.email,
        full_name: "未設定",
        // university, faculty などの情報は、別のプロフィール編集画面で入力させるのが一般的
      });
      profileError = error;
    } else if (data.role === "farmer") {
      const { error } = await supabase.from("farmers").insert({
        id: userId,
        email: data.email,
        farm_name: "未設定",
      });
      profileError = error;
    }

    if (profileError) {
      console.error("Profile Insert Error:", profileError);
      return {
        success: false,
        message: "アカウント作成中にデータベースエラーが発生しました。",
      };
    }
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
