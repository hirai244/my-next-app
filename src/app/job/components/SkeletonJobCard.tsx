import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export function SkeletonJobCard() {
  return (
    <Card className="flex flex-col relative overflow-hidden  border-none h-full p-0 shadow-lg">
      <Skeleton className="aspect-video  w-hull rounded-none" />
      <CardContent className="flex flex-1 flex-col p-4 justify-between space-y-4">
        <Skeleton className="h-6 w-3/4 mb-2" />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-1/3" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
