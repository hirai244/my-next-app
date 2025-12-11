import { Suspense } from "react";
import { SignUpForm } from "./SignUpForm";
import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";
import { Skeleton } from "@/src/components/ui/skeleton";

export default async function page() {
  const user = await currentUser();

  if (user) {
    const role = user.role;
    if (role === "farmer") {
      redirect("/job/dashboard");
    } else {
      redirect("/job/list");
    }
  }
  return (
    <div>
      <Suspense fallback={<Skeleton className="size-full" />}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
