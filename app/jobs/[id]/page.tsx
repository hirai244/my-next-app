import { getJob } from "@/lib/jobActions";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">{job.title}</h1>
    </div>
  );
}
