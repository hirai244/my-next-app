import { Section } from "@/components/Section";
import { getJob } from "@/lib/jobActions";
import { Calendar1, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const result = await getJob(id);

  if (!result.success) {
    notFound();
  }
  const job = result.data;

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
            <div className="bg-gray-200 flex items-center justify-center"></div>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          {job.title}
        </h1>
        <div className="text-2xl font-bold text-red-600 mb-4">
          メールアドレスを表示する
        </div>

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

      {/* 応募ボタン */}
    </div>
  );
}
