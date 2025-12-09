import { currentUser } from "@/src/lib/currentUser";
import { WorksList } from "./WorskList";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/login");
  }
  if (user.role !== "student") {
    return redirect("/job/farmer/dashboard");
  }
  return (
    <div>
      <WorksList />
    </div>
  );
}
