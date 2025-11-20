"use server";
import { ActionResult } from "@/schema/shared";
import { currentUser } from "./currentUser";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { GetJobResult, GetJobsResult } from "@/schema/job";

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
    return { success: false, message: "システムエラーが発生しました。" };
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
    console.error("応募作成失敗:", insertError);
    return {
      success: false,
      message: "応募処理中にデータベースエラーが発生しました。",
    };
  }

  redirect("/job/student/work");
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

export async function hasApplied(jobId: number) {
  const user = await currentUser();
  if (!user) {
    return {};
  }

  const supabase = await createClient();
}

// export async function applyToJob(jobId: number): Promise<ActionResult> {
//     const user = await currentUser();
//     if (!user) return { success: false, message: "ログインしてください。" };
//     const studentId = user.id;
//     const supabase = await createClient();

//     // 1. 🚨 二重応募チェック
//     const { count: existingApplyCount, error: checkError } = await supabase
//         .from("job_applications").select("id", { count: 'exact', head: true })
//         .eq("job_id", jobId).eq("student_id", studentId);
//     if ((existingApplyCount || 0) > 0) {
//         return { success: false, message: "既にこの募集に応募済みです。" };
//     }

//     // 2. 応募レコードの挿入
//     const { error: insertError } = await supabase.from("job_applications").insert({
//         job_id: jobId, student_id: studentId, status: "pending", applied_at: new Date().toISOString(),
//     });
//     if (insertError) { return { success: false, message: "応募記録の作成に失敗しました。" }; }

//     // 3. 🚨 募集人数の更新
//     const { error: updateError } = await supabase.from("jobs")
//         .update({ current_applicants: 'current_applicants + 1' }) // インクリメント
//         .eq("id", jobId);
//     if (updateError) { return { success: false, message: "人数更新に失敗しました。" }; }

//     revalidatePath(`/jobs/${jobId}`);
//     return { success: true, message: "応募が完了しました！" };
// }
