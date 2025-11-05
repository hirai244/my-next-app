import { getsJob } from "@/lib/jobActions";
import { notFound } from "next/navigation";
import React from "react";

export async function JobCardList() {
  const result = await getsJob();

  if (!result.success) {
    notFound();
  }

  return (
    <div>
      <h1>募集一覧</h1>
      {result.data.map((job) => (
        <div key={job.id}>
          {job.title} / {job.date} / {job.start}/{job.end} /{job.range_start} /{" "}
          {job.range_end}/ {job.zip_code} / {job.prefecture}/{job.city}/{" "}
          {job.address_line1} /{job.work_details} /{job.notes}
        </div>
      ))}
    </div>
  );
}
