"use server";
import { redirect } from "next/navigation";
import { currentUser } from "./currentUser";
import { ActionResult } from "@/src/types/shared";
import {
  FarmerFormValues,
  farmerSchema,
  StudentFormValues,
  studentSchema,
} from "@/src/schema/profile";
import { cache } from "react";
import { createClient } from "./supabase/server";
import { Tables } from "../types/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export async function createProfile(
  data: StudentFormValues | FarmerFormValues
): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  const userId = user.id;
  const role = user.role;
  let error: PostgrestError | null = null;

  const supabase = await createClient();
  if (role === "student") {
    const validated = studentSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        message: "入力内容に不備があります。",
      };
    }
    const result = await supabase.from("students").upsert({
      id: userId,
      full_name: validated.data.fullName,
      university: validated.data.university,
      location: validated.data.location,
      bio: validated.data.bio,
      email: validated.data.email,
    });
    error = result.error;
  } else if (role === "farmer") {
    const validated = farmerSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        message: "入力内容に不備があります。",
      };
    }
    const result = await supabase.from("farmers").upsert({
      id: userId,
      email: validated.data.email,
      farm_name: validated.data.farmName,
      location: validated.data.location,
      description: validated.data.description,
    });
    error = result.error;
  } else {
    return {
      success: false,
      message: "無効なユーザー権限です",
    };
  }

  if (error) {
    console.error("Profile Update Error:", error);
    return {
      success: false,
      message: "プロフィールの更新に失敗しました。",
    };
  }

  if (role === "student") {
    redirect("/job/list");
  } else {
    redirect("/job/dashboard"); //
  }
}

type GetProfileIdResult =
  | { success: true; data: string }
  | { success: false; message: string };

export const getFarmerId = cache(async (): Promise<GetProfileIdResult> => {
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

export const getStudentId = cache(async (): Promise<GetProfileIdResult> => {
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

type GetFarmerProfileResult =
  | {
      success: true;
      data: Tables<"farmers">;
    }
  | {
      success: false;
      message: string;
    };
export async function getFarmerProfile(): Promise<GetFarmerProfileResult> {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "認証されてないユーザーです。",
    };
  }
  const supabase = await createClient();
  const role = user.role;
  if (role !== "farmer") {
    return {
      success: false,
      message: "権限がありません。",
    };
  }

  const { data, error } = await supabase
    .from("farmers")
    .select()
    .eq("id", user.id)
    .single();

  if (error) {
    return {
      success: false,
      message: "プロフィールの取得に失敗しました。",
    };
  }
  return {
    success: true,
    data: data || null,
  };
}

type GetStudentProfileResult =
  | {
      success: true;
      data: Tables<"students">;
    }
  | {
      success: false;
      message: string;
    };
export async function getStudentProfile(): Promise<GetStudentProfileResult> {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "認証されてないユーザーです。",
    };
  }
  const supabase = await createClient();

  const role = user.role;
  if (role !== "student") {
    return {
      success: false,
      message: "権限がありません。",
    };
  }
  const { data, error } = await supabase
    .from("students")
    .select()
    .eq("id", user.id)
    .single();
  console.log(data, error);

  if (error) {
    return {
      success: false,
      message: "プロフィールの取得に失敗しました。",
    };
  }
  return {
    success: true,
    data: data || null,
  };
}

export async function editProfile(
  data: StudentFormValues | FarmerFormValues
): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "認証されてないユーザーです。",
    };
  }
  const role = user.role;

  const supabase = await createClient();
  let error: PostgrestError | null = null;
  if (role === "student") {
    const validated = studentSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        message: "入力内容に不備があります。",
      };
    }
    const result = await supabase
      .from("students")
      .update({
        id: user.id,
        email: validated.data.email,
        full_name: validated.data.fullName,
        bio: validated.data.bio,
        university: validated.data.university,
      })
      .eq("id", user.id);
    error = result.error;
  } else if (role === "farmer") {
    const validated = farmerSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        message: "入力内容に不備があります。",
      };
    }
    const result = await supabase
      .from("farmers")
      .update({
        id: user.id,
        email: validated.data.email,
        farm_name: validated.data.farmName,
        description: validated.data.description,
        location: validated.data.location,
      })
      .eq("id", user.id);
    error = result.error;
  } else {
    return {
      success: false,
      message: "無効なユーザー権限です",
    };
  }
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "プロフィールの更新に失敗しました。",
    };
  }
  return {
    success: true,
    message: "プロフィールが更新されました。",
    redirectUrl: "/",
  };
}
