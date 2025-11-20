import { JobCardSkeleton } from "../../JobCardSkelton";

export default function loading() {
  return (
    <div className="p-6">
      <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
