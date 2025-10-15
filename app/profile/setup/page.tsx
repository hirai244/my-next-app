import { ProfileSetupForm } from "@/components/profile/ProfileSetupForm";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export default async function profileSetupPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/signin");
  }

  return (
    <div className="container max-w-xl mx-auto py-12">
      <ProfileSetupForm userId={user.id} />
    </div>
  );
}
