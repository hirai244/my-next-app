"use server";
import { Calendar1, Clock, ImageOff, MapPin, Users } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { Section } from "@/src/components/Section";
import Link from "next/link";
import { currentUser } from "@/src/lib/currentUser";
import { getMyJob } from "@/src/lib/jobActions";
import { getMember } from "@/src/lib/applicationActions";
import { Button } from "@/src/components/ui/button";
type ParamsProps = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: ParamsProps) {
  const { id } = await params;
  const jobId = Number(id);
  if (isNaN(jobId)) notFound();

  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "farmer") {
    notFound();
  }

  const result = await getMyJob(jobId);
  if (!result.success) {
    return (
      //  後で修正
      <div className="p-10 text-center text-red-600">
        <p>データの取得に失敗しました。</p>
      </div>
    );
  }
  const job = result.data;

  const nowMember = await getMember(jobId);
  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-4xl mx-auto px-6 pt-6">
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
            <div className="w-hull flex flex-col items-center justify-center text-gray-400 bg-gray-100 h-hull">
              <ImageOff className="w-10 h-10 mb-2 opacity-30" />
              <span className="text-xs font-medium">No Image</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          {job.title}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-8 ">
        <Section title="📋 基本情報">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 text-sm text-gray-700">
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
                {nowMember}/{job.member}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-600 shrink-0" />
              <span>{job.email}</span>
            </div>
          </div>
        </Section>

        <Section title="✅ お仕事の内容">
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {job.work_details}
          </p>
        </Section>

        <Section title="📍 勤務地">
          <p className="text-gray-700">
            {job.prefecture} {job.city} {job.address_line1}
          </p>
          {/* Google Map */}
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

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 p-4 z-50 safe-area-bottom">
        <div className="max-w-4xl mx-auto flex gap-4 items-center justify-between">
          <Link
            href={`/job/dashboard/${job.id}/applications`}
            className="flex-1"
          >
            <Button className="w-full py-6 text-lg font-bold hover:shadow-lg hover:scale-103 bg-green-600 transition-transform duration-500">
              📩 応募者を見る
            </Button>
          </Link>

          <div className="w-auto shrink-0">
            <DeleteButton jobId={job.id} isDetailView={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
