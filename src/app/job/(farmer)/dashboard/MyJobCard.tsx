import Link from "next/link";
import { MapPin, Calendar, Clock, ImageOff } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { JobRow } from "@/src/types/shared";
import DeleteButton from "./[id]/DeleteButton";

interface MyJobCardProps {
  job: JobRow;
  href: string;
}

export function MyJobCard({ job, href }: MyJobCardProps) {
  const location = job.prefecture
    ? `${job.prefecture} ${job.city}`
    : "場所未定";

  const formattedDate = job.date
    ? format(new Date(job.date), "yyyy/MM/dd (eee)", { locale: ja })
    : "日時未定";

  return (
    <Card className="flex flex-col relative overflow-hidden hover:shadow-xl hover:translate-y-1 transition-all duration-300 border-none group h-hull p-0">
      <Link href={href} className="flex flex-col h-full">
        <div className="relative aspect-video bg-gray-100 overflow-hidden border-none w-hull p-0">
          {job.photo_url ? (
            <Image
              src={job.photo_url}
              alt={job.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-400">
              <ImageOff className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs font-medium">No Image</span>
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col p-4 justify-between space-y-4">
          <h2 className="line-clamp-2 text-lg font-bold text-gray-800 line-clamp-2 ">
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
