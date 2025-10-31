import { Create } from "@/components/recruitment/Create";
import { RBBCard } from "@/components/recruitment/RBBCard";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/auth/signin");
  }
  //className="grid lg:grid-cols-3"
  return (
    <div>
      <Create />
    </div>
  );
}
