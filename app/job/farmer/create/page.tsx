import { Create } from "@/components/job/Create";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/auth/signin");
  }
  //className="grid lg:grid-cols-3"
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          新規募集の作成
        </h1>
        <Create />
      </div>
    </div>
  );
}
