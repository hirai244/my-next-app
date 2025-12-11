import { Suspense } from "react";
import { JobsList } from "./JobsList";
import { Skeleton } from "@/src/components/ui/skeleton";
import { SkeletonJobCard } from "../../components/SkeletonJobCard";
import { SkeletonJobList } from "../../components/SkeletonJobList";

export default function page() {
  return (
    <div>
      <Suspense fallback={<SkeletonJobList />}>
        <JobsList />
      </Suspense>
    </div>
  );
}
