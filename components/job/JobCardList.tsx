import { getJobs } from "@/lib/jobActions";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export async function JobCardList() {
  const result = await getJobs();

  if (!result.success) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1>募集一覧</h1>
      <div className="grid grid-cols-2 gap-2">
        {result.data.map((job) => (
          <div key={job.id} className="border p-2 rounded-lg">
            <div className="aspect-video bg-muted border rounded-lg mb-4"></div>
            <Link className="" href={"/jobs/${job.id}"}>
              {job.title} / {job.date}
              <span className="absolute inset-0"></span>
            </Link>
            {/* {job.title} / {job.date} / {job.start}/{job.end} /{job.range_start}{" "}
            / {job.range_end}/ {job.zip_code} / {job.prefecture}/{job.city}/{" "}
            {job.address_line1}  */}
          </div>
        ))}
      </div>
    </div>
  );
}
