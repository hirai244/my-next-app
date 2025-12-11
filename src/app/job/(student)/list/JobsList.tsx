import { notFound } from "next/navigation";
import React from "react";
import JobCard from "./JobCard";
import { getJobs } from "@/src/lib/jobActions";
import { Inbox } from "lucide-react";

export async function JobsList() {
  const result = await getJobs();
  if (!result.success) {
    return (
      <div className="p-6 text-red-500">
        募集情報の取得中にエラーが発生しました: {result.message}
      </div>
    );
  }

  if (result.data.length === 0) {
    <div className="p-12 flex flex-col items-center justify-center text-center text-gray-500">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Inbox className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        現在、募集中のジョブはありません
      </h3>
      <p className="text-sm mt-1">新しい募集が公開されるまでお待ちください。</p>
    </div>;
  }
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            href={`/job/list/${job.id}`}
            isApplied={job.isApplied}
          />
        ))}
      </div>

      {result.data.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          現在、募集中のジョブはありません。
        </p>
      )}
    </div>
  );
}
