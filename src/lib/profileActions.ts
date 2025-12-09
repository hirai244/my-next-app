"use server";
import { redirect } from "next/navigation";
import { currentUser } from "./currentUser";
import { ActionResult } from "@/src/types/shared";
import { farmerSchema, studentSchema } from "@/src/schema/profile";
import { cache } from "react";
import { createClient } from "./supabase/server";

export async function createProfile(formData: FormData): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  const userId = user.id;
  const role = user.role;
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
    const { error } = await supabase.from("students").upsert({
      id: userId,
      email: validated.data.email,
      full_name: validated.data.fullName,
      university: validated.data.university,
      location: validated.data.location,
      bio: validated.data.bio,
    });
    updateError = error;
  } else if (role === "farmer") {
    const validated = farmerSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "入力内容に不備があります。",
      };
    }
    const { error } = await supabase.from("farmers").upsert({
      id: userId,
      email: validated.data.email,
      farm_name: validated.data.farmName,
      location: validated.data.location,
      description: validated.data.description,
    });
    updateError = error;
  } else {
    return {
      success: false,
      message: "無効なユーザー権限です",
    };
  }

  if (updateError) {
    console.error("Profile Update Error:", updateError);
    return {
      success: false,
      message: "プロフィールの更新に失敗しました。",
    };
  }

  if (role === "student") {
    redirect("/job/list");
  } else {
    redirect("/job/dashboard");
  }
}

type GetProfileResult =
  | { success: true; data: string }
  | { success: false; message: string };

export const getFarmerId = cache(async (): Promise<GetProfileResult> => {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "認証されてないユーザーです。",
    };
  }
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("farmers")
    .select("id")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return {
      success: false,
      message: "プロフィールが登録されてません。",
    };
  }
  return { success: true, data: data.id };
});

export const getStudentId = cache(async (): Promise<GetProfileResult> => {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "認証されてないユーザーです。",
    };
  }
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("students")
    .select("id")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return {
      success: false,
      message: "プロフィールが登録されてません。",
    };
  }
  return { success: true, data: data.id };
});
