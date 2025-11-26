"use server";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "./currentUser";
import { GetJobsResult } from "@/schema/job";

export async function getMyWorks(): Promise<GetJobsResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }

  const supabase = await createClient();
  const studentId = user.id;
  const { data: applications, error: appError } = await supabase
    .from("applications")
    .select("job_id")
    .eq("student_id", studentId);

  if (appError) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }
  if (!applications || applications.length === 0) {
    return { success: true, data: [] };
  }
  const appliedJobIds = applications.map((app) => app.job_id);

  const { data: myJobs, error: jobError } = await supabase
    .from("jobs")
    .select()
    .in("id", appliedJobIds);

  if (jobError) {
    return {
      success: false,
      message: "募集データの取得中にデータベースエラーが発生しました",
    };
  }
  return {
    success: true,
    data: myJobs || [],
  };
}
