import { notFound } from "next/navigation";
import React from "react";
import JobCard from "../../JobCard";
import { getAppliedJobs } from "@/lib/applicationActions";

export default async function page() {
  const result = await getAppliedJobs();

  if (!result.success) {
    console.log("ajda");
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">募集一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data?.map((job) => (
          <JobCard key={job.id} job={job} />
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
