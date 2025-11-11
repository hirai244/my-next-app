"use server";
import { Calendar1, Clock, HandPlatter, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { getRole } from "@/lib/profileActions";
import { getMyJob } from "@/lib/jobActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const role = await getRole();
  const result = await getMyJob(id);

  if (!result.success) {
    notFound();
  }

  const job = result.data;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {" "}
      <div className="bg-white shadow-md p-6 md:p-8">
        <div className="aspect-video bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
          <p className="text-gray-500">募集写真エリア</p>
          [Image of agricultural field]
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {job.title}
        </h1>
        <div className="text-2xl font-bold text-red-600 mb-4">
          メールアドレスを表示する
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <Calendar1 className="w-5 h-5 text-green-600" />
            <span>日付: {job.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span>
              時間: {job.start} - {job.end}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>
              場所: {job.prefecture}
              {job.city}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <HandPlatter className="w-5 h-5 text-green-600" />
            <span>農園名: {job.title || "情報なし"} (仮)</span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <Section title="✅ お仕事の内容">
          <p className="whitespace-pre-wrap leading-relaxed">
            {job.work_details}
          </p>
        </Section>
        <Section title="📍 勤務地">
          <p>
            {job.prefecture}
            {job.city}
            {job.address_line1}
          </p>
          {/* ここに簡易地図のプレースホルダーなどを入れる */}
          <div className="h-40 bg-gray-200 mt-4 rounded flex items-center justify-center text-sm text-gray-500">
            地図表示エリア (仮)
          </div>
        </Section>
        <Section title="⚠️ その他注意事項">
          <p className="text-red-600">{job.notes || "特になし"}</p>
        </Section>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 mb-2">編集する</p>
          <Button
            asChild
            className="w-full py-3 bg-red-500 text-white text-lg font-bold rounded-lg hover:bg-red-600 transition disabled:bg-red-300"
          >
            <Link href={`/job/farmer/edit/${id}`}>編集する</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ヘルパーコンポーネント
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
      {title}
    </h2>
    {children}
  </div>
);
