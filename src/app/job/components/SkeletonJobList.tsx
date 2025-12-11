import { SkeletonJobCard } from "./SkeletonJobCard";

export function SkeletonJobList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <SkeletonJobCard key={i} />
      ))}
    </div>
  );
}
