"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { currentUser } from "./currentUser";
import { ActionResult } from "@/schema/shared";
import { farmerSchema, studentSchema } from "@/schema/profile";

export async function createProfile(formData: FormData): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  const userId = user.id;
  const role = user.user_metadata.role;

  const rawData = Object.fromEntries(formData.entries());

  let updateError;

  const supabase = await createClient();

  if (role === "student") {
    const validated = studentSchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        message: "入力内容に不備があります。",
      };
    }
    const { error } = await supabase
      .from("students")
      .update({
        full_name: validated.data.fullName,
        university: validated.data.university,
        location: validated.data.location,
        bio: validated.data.bio,
      })
      .eq("id", userId);
    updateError = error;
  } else if (role === "farmer") {
    const validated = farmerSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "入力内容に不備があります。",
      };
    }
    const { error } = await supabase
      .from("farmers")
      .update({
        farm_name: validated.data.farmName,
        location: validated.data.location,
        description: validated.data.description,
      })
      .eq("id", userId);
    updateError = error;
  }

  if (updateError) {
    console.error("Profile Update Error:", updateError);
    return {
      success: false,
      message: "プロフィールの更新に失敗しました。",
    };
  }

  if (role === "student") {
    redirect("/job/student/list");
  } else {
    redirect("/job/farmer/dashboard");
  }
}
