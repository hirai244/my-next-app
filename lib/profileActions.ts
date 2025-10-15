"use server";
import { ActionResult, ProfileFormValues } from "@/schema/profile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { currentUser } from "./currentUser";

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
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      role: data.role,
    })
    .eq("id", userId)
    .select()
    .single();

  if (profileError) {
    console.log(profileError);
    return { success: false, message: "登録に失敗しました" };
  }
  //   まとめてエラーを判定するため
  let detailsError = null;
  //追加
  if (data.role === "farmer") {
    const { error } = await supabase.from("farmers").insert({
      //後で追加するかも
      user_id: userId,
      farm_name: data.farmName || "",
      description: data.description || "",
      mainCrops: data.mainCrops || [],
      location: data.location || "",
    });
    detailsError = error;
  } else if (data.role === "student") {
    const { error } = await supabase.from("students").insert({
      //後で追加する
      user_id: userId,
      bio: data.bio || "",
    });
    detailsError = error;
  }

  if (detailsError) {
    console.log(detailsError);
    return { success: false, message: "登録に失敗しました" };
  }
  redirect("/");
}
