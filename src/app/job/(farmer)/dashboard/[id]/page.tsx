"use server";
import { Calendar1, Clock, MapPin, Users } from "lucide-react";
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
  //エラー処理を書く

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
              {nowMember}/{job.member}
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
      <div className="fixed bottom-0 ...">
        <div className="max-w-4xl mx-auto flex gap-4 items-center">
          <Link
            href={`/job/dashboard/${job.id}/applications`}
            className="flex-1"
          >
            <Button className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg">
              📩 応募者を見る ({/* ここに応募数入れる */})
            </Button>
          </Link>
          <div className="w-auto">
            <DeleteButton jobId={job.id} isDetailView={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
