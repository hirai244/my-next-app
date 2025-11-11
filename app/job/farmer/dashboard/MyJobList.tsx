import { getMyJobs } from "@/lib/jobActions";
import { notFound, redirect } from "next/navigation";
import React from "react";
import MyJobCard from "../../MyJobCard";

export async function MyJobsList() {
  const result = await getMyJobs();

  if (!result.success) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">募集一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data.map((job) => (
          <MyJobCard key={job.id} job={job} />
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
