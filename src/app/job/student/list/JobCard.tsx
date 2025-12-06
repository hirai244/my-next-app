import Link from "next/link";
import { JobRow } from "@/src/schema/job";
import { MapPin, Calendar, Clock, ImageOff } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
interface JobCardProps {
  job: JobRow;
  href: string;
  isApplied?: boolean;
}

export default function JobCard({
  job,
  href,
  isApplied = false,
}: JobCardProps) {
  const location = job.prefecture
    ? `${job.prefecture} ${job.city}`
    : "場所未定";

  const formattedDate = job.date
    ? format(new Date(job.date), "yyyy/MM/dd (eee)", { locale: ja })
    : "日時未定";

  return (
    <Card className="relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-none group h-full flex flex-col p-0">
      <Link href={href} className="flex flex-col h-full">
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          {job.photo_url ? (
            <Image
              src={job.photo_url}
              alt={job.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-400">
              <ImageOff className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs font-medium">No Image</span>
            </div>
          )}
          {isApplied && (
            <div className="absolute top-2 right-2 z-20 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
              応募済み
            </div>
          )}
        </div>

        <CardContent className="p-5 flex-1 flex flex-col space-y-3">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2 ">
            {job.title}
          </h2>

          <div className="mt-auto space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600 shrink-0" />
              <span className="truncate">{location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600 shrink-0" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600 shrink-0" />
              <span>
                {job.start} 〜 {job.end}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
