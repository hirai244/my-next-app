import Link from "next/link";
import { JobRow } from "@/schema/job";
import { MapPin, Calendar, Clock } from "lucide-react";

// const formatDate = (isoString) => {
//     if (!isoString) return '日付未定';
//     // 例: new Date(isoString).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
//     return isoString.substring(0, 10).replace(/-/g, '/'); // 簡易的な整形
// };

export default function MyJobCard({ job }: { job: JobRow }) {
  // const jobDate = formatDate(job.date);
  const location = job.prefecture
    ? `${job.prefecture} ${job.city}`
    : "場所未定";

  return (
    <div className="relative border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <Link href={`/myjobs/${job.id}`} passHref>
        {/* 1. 画像プレースホルダー */}
        <div className="aspect-video bg-gray-100 flex items-center justify-center">
          <p className="text-sm text-gray-400">画像プレースホルダー</p>
        </div>
        <div className="p-4 space-y-3">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
            {job.title}
          </h2>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-green-500 shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-green-500 shrink-0" />
              <span>{job.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-500 shrink-0" />
              <span>
                {job.start} ~ {job.end}
              </span>
            </div>
          </div>
        </div>

        <span className="absolute inset-0 z-10" aria-hidden="true"></span>
      </Link>

      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-20">
        新着
      </div>
    </div>
  );
}
