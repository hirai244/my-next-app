import { Create } from "@/src/app/job/farmer/create/Create";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/auth/signin");
  }
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <Create />
      </div>
    </div>
  );
}
