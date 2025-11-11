"use server";
import { getMyJob } from "@/lib/jobActions";
import { notFound } from "next/navigation";
import { EditForm } from "./EditForm";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const result = await getMyJob(id);

  if (!result.success) {
    notFound();
  }
  const job = result.data;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          募集の編集: {job.title}
        </h1>

        {/* 💡 JobEditForm に取得した job データを初期値として渡す */}
        <EditForm initialJobData={job} jobId={id} />
      </div>
    </div>
  );
}
