"use server";

import { jobSchema } from "@/src/schema/job";
import { currentUser } from "./currentUser";
import { redirect } from "next/navigation";
import { ActionResult, GetJobsResult, JobRow } from "@/src/types/shared";
import { revalidatePath } from "next/cache";
import { getFarmerId } from "./profileActions";
import { createClient } from "./supabase/server";

export async function createJob(formData: FormData): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }

  const result = await getFarmerId();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }
  const farmerId = result.data;

  const supabase = await createClient();
  const rawJobData = {
    title: formData.get("title"),
    email: formData.get("email"),
    date: formData.get("date"),
    start: formData.get("start"),
    end: formData.get("end"),
    range: {
      from: formData.get("range_start"),
      to: formData.get("range_end"),
    },
    member: formData.get("member"),
    zipCode: formData.get("zipCode"),
    prefecture: formData.get("prefecture"),
    city: formData.get("city"),
    addressLine1: formData.get("addressLine1"),
    workDetails: formData.get("workDetails"),
    notes: formData.get("notes"),
    photoUrl: formData.get("photoUrl"),
    jobImage: formData.get("jobImage") as File | null,
  };

  const validatedJob = jobSchema.safeParse(rawJobData);
  if (!validatedJob.success) {
    console.error(
      "Zodバリデーションエラー:",
      validatedJob.error.flatten().fieldErrors,
      rawJobData
    );
    return {
      success: false,
      message: "入力内容に不備があります。",
    };
  }
  let photoUrl: string | null = null;
  const imageFile = rawJobData.jobImage;

  if (imageFile instanceof File && imageFile.size > 0) {
    const fileNameParts = imageFile.name.split(".");
    const fileExtension =
      fileNameParts.length > 1 ? fileNameParts.pop() : "bin";

    const filePath = `job_photos/${user.id}/${Date.now()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("job_photos")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("画像アップロード失敗:", uploadError);
      return {
        success: false,
        message: "写真のアップロード中にエラーが発生しました。",
      };
    }

    const { data: publicUrlData } = supabase.storage
      .from("job_photos")
      .getPublicUrl(filePath);

    photoUrl = publicUrlData.publicUrl;
  }
  if (
    !validatedJob.data.date ||
    !validatedJob.data.range?.from ||
    !validatedJob.data.range?.to
  ) {
    return {
      success: false,
      message: "日付と期間が不足しています。",
    };
  }
  const { error: insertError } = await supabase.from("jobs").insert({
    farmer_id: farmerId,
    title: validatedJob.data.title,
    email: validatedJob.data.email,
    date: validatedJob.data.date.toISOString(),
    start: validatedJob.data.start,
    end: validatedJob.data.end,
    range_start: validatedJob.data.range.from.toISOString(),
    range_end: validatedJob.data.range.to.toISOString(),
    member: validatedJob.data.member,
    zip_code: validatedJob.data.zipCode,
    prefecture: validatedJob.data.prefecture,
    city: validatedJob.data.city,
    address_line1: validatedJob.data.addressLine1,
    work_details: validatedJob.data.workDetails,
    notes: validatedJob.data.notes || null,
    photo_url: photoUrl,
    status: "active",
    current_member: 0,
    created_at: new Date().toISOString(),
  });
  if (insertError) {
    console.error("募集作成失敗:", insertError);
    return {
      success: false,
      message: insertError.message || "募集の作成に失敗しました。",
    };
  }
  revalidatePath("/job/dashboard");
  redirect("/job/dashboard");
}

export async function deleteJob(jobId: number): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  if (user.role !== "farmer") {
    return { success: false, message: "権限がありません。" };
  }
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId)
    .eq("farmer_id", user.id);

  if (error) {
    console.error("削除エラー:", error);
    return { success: false, message: "消去に失敗しました。" };
  }
  revalidatePath("/job/dashboard");

  return { success: true, message: "削除しました。" };
}

//農家側
export async function getMyJobs(): Promise<GetJobsResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  if (user.role !== "farmer") {
    return { success: false, message: "権限がありません。" };
  }

  const result = await getFarmerId();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }
  const farmerId = result.data;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select()
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
export type GetJobResult =
  | {
      success: true;
      data: JobRow;
    }
  | {
      success: false;
      message: string;
    };

export async function getMyJob(jobId: number): Promise<GetJobResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  if (user.role !== "farmer") {
    return { success: false, message: "権限がありません。" };
  }
  const result = await getFarmerId();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }
  const farmerId = result.data;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select()
    .eq("id", jobId)
    .eq("farmer_id", farmerId)
    .single();

  console.log(data, error);

  if (error) {
    if (error.code === "PGRST116") {
      return {
        success: false,
        message: "指定された募集は見つかりませんでした。",
      };
    }
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }

  return {
    success: true,
    data: data || null,
  };
}
//学生側
export type jobWithStatus = JobRow & {
  isApplied: boolean;
};
export type GetJobsWithAppliedResult =
  | {
      success: true;
      data: jobWithStatus[];
    }
  | {
      success: false;
      message: string;
    };
export async function getJobs(): Promise<GetJobsWithAppliedResult> {
  const supabase = await createClient();
  const user = await currentUser();

  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select()
    .order("range_end", { ascending: true })
    .limit(100);

  console.log(jobs, jobsError);

  if (jobsError) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }
  if (!jobs) {
    return { success: true, data: [] };
  }
  let appliedJobIds: number[] = [];
  if (user) {
    const studentId = user.id;
    const { data: applications } = await supabase
      .from("applications")
      .select("job_id")
      .eq("student_id", studentId);

    if (applications) {
      appliedJobIds = applications.map((app) => app.job_id);
    }
  }

  const jobWithStatus = jobs.map((job) => ({
    ...job,
    isApplied: appliedJobIds.includes(job.id),
  }));
  return { success: true, data: jobWithStatus };
}

export async function getJob(jobId: number): Promise<GetJobResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select()
    .eq("id", jobId)
    .single();

  console.log(data, error);

  if (error) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }

  return {
    success: true,
    data: data || null,
  };
}
