"use server";
import { ActionResult } from "@/schema/shared";
import { currentUser } from "./currentUser";
import { createClient } from "@/utils/supabase/server";
import { GetJobsResult } from "@/schema/job";
import { revalidatePath } from "next/cache";

export async function applyJob(jobId: number): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }

  const supabase = await createClient();
  const studentId = user.id;

  const { data: existingApp, error: checkError } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("student_id", studentId)
    .maybeSingle();

  if (checkError) {
    console.error("", checkError);
    return {
      success: false,
      message: "応募状況の確認中にエラーが発生しました。",
    };
  }
  if (existingApp) {
    return { success: false, message: "すでに応募済みです。" };
  }
  const { error: insertError } = await supabase.from("applications").insert({
    job_id: jobId,
    student_id: studentId,
    status: "pending",
  });

  if (insertError) {
    console.error("応募失敗:", insertError);
    return {
      success: false,
      message: "応募の登録中にエラーが発生しました。",
    };
  }
  revalidatePath(`/job/student/dashboard/${jobId}`);

  return { success: true, message: "応募が完了しました。" };
}

export async function getAppliedJobs(): Promise<GetJobsResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }

  const supabase = await createClient();
  const studentId = user.id;

  const { data: applyData, error: applyError } = await supabase
    .from("applications")
    .select("job_id")
    .eq("student_id", studentId);

  if (applyError) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }

  if (!applyData || applyData.length === 0) {
    return { success: true, data: [] };
  }

  const appliedJobIds = applyData.map((apply) => apply.job_id);

  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .select()
    .in("id", appliedJobIds);

  console.log(jobData, jobError);

  if (jobError) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }

  return {
    success: true,
    data: jobData || [],
  };
}

export async function hasApplied(jobId: number): Promise<boolean> {
  const user = await currentUser();
  if (!user) {
    return false;
  }
  const studentId = user.id;
  const supabase = await createClient();
  const { data: application, error } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("student_id", studentId)
    .maybeSingle();
  if (error) {
    console.error("確認エラー：", error);
    return false;
  }
  return !!application;
  // プロフィールidと紐づける
}
