"use server";
import { ActionResult } from "@/schema/shared";
import { currentUser } from "./currentUser";
import { createClient } from "@/utils/supabase/server";
import { GetJobsResult } from "@/schema/job";
import { revalidatePath } from "next/cache";
import { create } from "domain";
import { getStudentId } from "./profileActions";
import { get } from "http";
import App from "next/app";

export async function applyJob(jobId: number): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }

  const result = await getStudentId();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }
  const studentId = result.data;

  const supabase = await createClient();
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

  const result = await getStudentId();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }
  const studentId = result.data;

  const supabase = await createClient();
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

// 戻り値の指定
export async function getApplications(jobId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select(
      `*,student:students (
    full_name,
    university,
    location,
    bio,
    email  
    )` //emailの後にカンマがついてるとエラーになるsupabase側が続きがあると思い
    )

    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("取得エラー", error);
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }

  return {
    success: true,
    data: data || [],
  };
}

export async function updateApplicationStatus(
  applicationId: number,
  newStatus: "accepted" | "rejected"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("applications")
    .update({ status: newStatus })
    .eq("id", applicationId);

  if (error) {
    return {
      success: false,
      message: "更新中にデータベースエラーが発生しました",
    };
  }
  revalidatePath("/job/student/dashboard");
  return {
    success: true,
    message: "更新成功",
  };
}

export async function getMember(jobId: number) {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("applications")
    .select("", { count: "exact", head: true })
    .eq("job_id", jobId)
    .eq("status", "accepted");

  if (error) {
    console.error("カウントエラー:", error);
    return 0; //エラーの場合の処理を後で追加しる
  }
  return count || 0;
}
export type ApplicationStatus = "pending" | "accepted" | "rejected" | null;

type ApplicationResult =
  | { success: true; status: ApplicationStatus }
  | { success: false; message: string };

export async function getApplicationResult(
  jobId: number
): Promise<ApplicationResult> {
  const supabase = await createClient();
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "認証されてないユーザーです。",
    };
  }
  const studentId = user.id;

  const { data, error } = await supabase
    .from("applications")
    .select("status")
    .eq("job_id", jobId)
    .eq("student_id", studentId)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }
  if (!data) {
    return { success: true, status: null };
  }
  return { success: true, status: data.status as ApplicationStatus };
}
