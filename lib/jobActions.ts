"use server";

import { GetJobsResult, JobCreateValues, JobRow } from "@/schema/job";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "./currentUser";
import { redirect } from "next/navigation";
import { ActionResult } from "@/schema/shared";

export async function createJob(data: JobCreateValues): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  const farmerId = user.id;

  const supabase = await createClient();

  const { error: rbbError } = await supabase.from("jobs").insert({
    farmer_id: farmerId,
    title: data.title,
    date: data.date.toISOString(),
    start: data.start,
    end: data.end,
    range_start: data.range.from.toISOString(),
    range_end: data.range.to.toISOString(),
    // member: data.member,
    zip_code: data.zipCode,
    prefecture: data.prefecture,
    city: data.city,
    address_line1: data.addressLine1,
    work_details: data.work_details,
    // bring_items: data.bring_items,
    notes: data.notes || null,
    // photo:,
  });

  if (rbbError) {
    console.error("job initial UPSERT failed:", rbbError);
    return {
      success: false,
      message: rbbError.message || "募集の作成に失敗しました。",
    };
  }
  redirect("/");
}

export async function getsJob(): Promise<GetJobsResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }

  const farmerId = user.id;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select()
    // .select("*")
    .eq("farmer_id", farmerId);

  console.log(data, error);

  if (error) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }

  return { success: true, data: data || [] };
}

export async function getJob(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select()
    .eq("id", parseInt(id, 10)) //おそらくsupabaseではnumber型になってるため
    .single();

  console.log(data, error);

  return data;
}
