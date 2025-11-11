"use server";
import { getRoleResult, ProfileFormValues } from "@/schema/profile";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "./currentUser";
import { cache } from "react";
import { ActionResult } from "@/schema/shared";

export async function createProfile(
  data: ProfileFormValues
): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  const userId = user.id;

  const supabase = await createClient();
  //テーブルの更新
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      role: data.role,
    },
    { onConflict: "id" }
  );
  // .eq("id", userId);
  // .select()
  // .single();
  if (profileError) {
    return {
      success: false,
      message: "プロフィールの作成に失敗しました。",
    };
    // console.error("Profiles initial UPSERT failed:", profileError);
    // throw new Error("基本情報の初期設定に失敗しました。");
  }
  //   まとめてエラーを判定するため
  let detailsError = null;
  //追加
  if (data.role === "farmer") {
    const { error } = await supabase.from("farmer_details").upsert(
      {
        user_id: userId,
        farm_name: data.farmName || null,
        location: data.location || null,
      },
      { onConflict: "user_id" }
    );
    detailsError = error;
  } else if (data.role === "student") {
    const { error } = await supabase.from("student_details").upsert(
      {
        //後で追加する
        user_id: userId,
        bio: data.bio || null,
        university: data.university,
        major: data.major,
      },
      { onConflict: "user_id" }
    );
    detailsError = error;
  }

  if (detailsError) {
    console.error("Details UPSERT failed:", detailsError);
    throw new Error("詳細情報の登録中にエラーが発生しました。");
  }
  redirect("/");
}

// export const getRole = cache(async () => {
//   const user = await currentUser();
//   if (!user) {
//     return {
//       success: false,
//       message: "認証されてないユーザーです。",
//     };
//   }

//   const userId = user.id;

//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("profiles")
//     .select("role")
//     .eq("id", userId)
//     .single();

//   if (error || !data) {
//     console.error("Failed to fetch user role:", error);
//     return null;
//   }
//   return data.role as "farmer" | "student";
// });

export async function getRole(): Promise<getRoleResult> {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "認証されてないユーザーです。",
    };
  }
  const userId = user.id;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  console.log(data, error);

  if (error) {
    console.error("ロール所得DBエラー:", error);
    return { success: false, message: "ロールの取得に失敗しました。" };
  }

  if (!data || data.role === null) {
    console.warn(
      "User ${userId} has no profile or role set, defaulting to 'guest'."
    );
    return { success: true, role: "guest" };
  }
  return { success: true, role: data.role as "farmer" | "student" };
}
