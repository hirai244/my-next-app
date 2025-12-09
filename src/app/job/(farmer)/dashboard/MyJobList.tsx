import { notFound } from "next/navigation";
import React from "react";
import { getMyJobs } from "@/src/lib/jobActions";
import { MyJobCard } from "./MyJobCard";

export async function MyJobsList() {
  const result = await getMyJobs();
  if (!result.success) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data.map((job) => (
          <MyJobCard key={job.id} job={job} href={`/job/dashboard/${job.id}`} />
        ))}
      </div>

      {result.data.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          募集を作成してください
        </p>
      )}
    </div>
  );
}
