"use server";

import { GetJobResult, GetJobsResult, jobSchema } from "@/schema/job";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "./currentUser";
import { redirect } from "next/navigation";
import { ActionResult } from "@/schema/shared";
import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData): Promise<ActionResult> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "認証されてないユーザーです。" };
  }
  const farmerId = user.id;
  const supabase = await createClient();

  const rawJobData = {
    title: formData.get("title"), //name属性の値
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
    //
    return {
      success: false,
      message: "入力内容に不備があります。",
    };
  }
  const jobValues = validatedJob.data;

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

    // 4-2. 公開 URL の取得
    const { data: publicUrlData } = supabase.storage
      .from("job_photos")
      .getPublicUrl(filePath);

    photoUrl = publicUrlData.publicUrl;
  }
  if (!jobValues.date || !jobValues.range?.from || !jobValues.range?.to) {
    return {
      success: false,
      message: "必須項目（日付または期間）が不足しています。",
    };
  }
  const { error: insertError } = await supabase.from("jobs").insert({
    farmer_id: farmerId,
    title: jobValues.title,
    date: jobValues.date.toISOString(),
    start: jobValues.start,
    end: jobValues.end,
    range_start: jobValues.range.from.toISOString(),
    range_end: jobValues.range.to.toISOString(),
    member: jobValues.member,
    zip_code: jobValues.zipCode,
    prefecture: jobValues.prefecture,
    city: jobValues.city,
    address_line1: jobValues.addressLine1,
    work_details: jobValues.workDetails,
    notes: jobValues.notes || null,
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
  revalidatePath("/job/farmer/dashboard");
  redirect("/job/farmer/dashboard");
}

export async function deleteJob(jobId: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("jobs").delete().eq("id", jobId);

  if (error) {
    console.error("削除エラー:", error);
    return { success: false, message: "消去に失敗しました。" };
  }
  revalidatePath("/job/farmer/dashboard");

  return { success: true, message: "削除しました。" };
}

//農家側

export async function getMyJobs(): Promise<GetJobsResult> {
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

export async function getMyJob(id: string): Promise<GetJobResult> {
  const supabase = await createClient();

  const jobId = parseInt(id, 10);
  if (isNaN(jobId)) {
    return {
      success: false,
      message: "無効なIDです",
    };
  }
  const { data, error } = await supabase
    .from("jobs")
    .select()
    // .eq("id", id)
    .eq("id", jobId) //おそらくsupabaseではnumber型になってるため
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
//学生側

export async function getJobs(): Promise<GetJobsResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select()
    .order("range_end", { ascending: true });

  console.log(data, error);

  if (error) {
    return {
      success: false,
      message: "取得中にデータベースエラーが発生しました",
    };
  }
  return { success: true, data: data || [] };
}

export async function getJob(id: string): Promise<GetJobResult> {
  const supabase = await createClient();

  const jobId = parseInt(id, 10);
  if (isNaN(jobId)) {
    return {
      success: false,
      message: "無効なIDです",
    };
  }
  const { data, error } = await supabase
    .from("jobs")
    .select()
    // .eq("id", id)
    .eq("id", jobId) //おそらくsupabaseではnumber型になってるため
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
