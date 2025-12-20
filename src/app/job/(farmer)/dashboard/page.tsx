import { currentUser } from "@/src/lib/currentUser";
import { MyJobsList } from "./MyJobList";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { SkeletonJobList } from "../../components/SkeletonJobList";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "farmer") {
    notFound();
  }
  return (
    <div>
      <Suspense fallback={<SkeletonJobList />}>
        <MyJobsList />
      </Suspense>
    </div>
  );
}
