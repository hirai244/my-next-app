import AuthCard from "@/src/app/auth/AuthCard";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import { StudentForm } from "./StudentForm";
import { FarmerForm } from "./FarmerForm";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/signin");
  }

  const role = user.user_metadata.role;

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-12">
      <AuthCard title="" description="">
        {role === "student" ? <StudentForm /> : <FarmerForm />}
      </AuthCard>
    </div>
  );
}
