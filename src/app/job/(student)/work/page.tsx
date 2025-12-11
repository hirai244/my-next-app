import { currentUser } from "@/src/lib/currentUser";
import { WorksList } from "./WorskList";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SkeletonJobList } from "../../components/SkeletonJobList";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/login");
  }
  if (user.role !== "student") {
    return redirect("/job/dashboard");
  }
  return (
    <div>
      <Suspense fallback={<SkeletonJobList />}>
        <WorksList />
      </Suspense>
    </div>
  );
}
