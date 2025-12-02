"use server";
import { Section } from "@/components/Section";
import { getApplicationResult, getMember } from "@/lib/applicationActions";
import { getJob } from "@/lib/jobActions";
import { Calendar1, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { ApplyButton } from "../ApplyButton";
import { currentUser } from "@/lib/currentUser";

type ParamsProps = {
  params: Promise<{ id: string }>;
};
export default async function page({ params }: ParamsProps) {
  const { id } = await params;
  const jobId = Number(id);
  if (isNaN(jobId)) notFound();

  const result = await getJob(jobId);
  if (!result.success) {
    notFound();
  }
  const job = result.data;

  const member = await getMember(jobId);

  const appResult = await getApplicationResult(jobId);

  const currentStatus = appResult.success ? appResult.status : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video w-full mb-6 rounded-xl overflow-hidden shadow-inner bg-gray-100">
          {job.photo_url ? (
            <Image
              src={job.photo_url}
              alt={job.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          ) : (
            <div className="bg-gray-200 flex items-center justify-center">
              画像
            </div>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          {job.title}
        </h1>
        <div className="text-2xl font-bold  mb-4">{job.email}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <Calendar1 className="w-4 h-4 text-green-600 shrink-0" />
            <span>{job.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-600 shrink-0" />
            <span>
              {job.start} - {job.end}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-green-600 shrink-0" />
            <span>
              {job.prefecture} {job.city}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-green-600 shrink-0" />
            <span>
              {member}/{job.member}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <Section title="✅ お仕事の内容">
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {job.work_details}
          </p>
        </Section>

        <Section title="📍 勤務地">
          <p className="text-gray-700">
            {job.prefecture} {job.city} {job.address_line1}
          </p>
          {/* Google Maps */}
          <div className="h-48 bg-gray-200 mt-4 rounded-lg flex items-center justify-center text-sm text-gray-500">
            ここに地図が表示されます
          </div>
        </Section>

        {job.notes && (
          <Section title="⚠️ その他注意事項">
            <p className="text-gray-700 whitespace-pre-wrap">{job.notes}</p>
          </Section>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <ApplyButton jobId={jobId} currentStatus={currentStatus} />
        </div>
      </div>
    </div>
  );
}
