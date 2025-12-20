import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";
import { FarmerForm } from "./FarmerForm";
import { StudentForm } from "./StudentForm";
import AuthCard from "../../auth/AuthCard";
import { getFarmerProfile, getStudentProfile } from "@/src/lib/profileActions";
import { FarmerFormValues, StudentFormValues } from "@/src/schema/profile";
export default async function page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/auth/signin");
  }
  const role = user.role;

  if (role === "student") {
    const result = await getStudentProfile();
    console.log(result);
    if (!result.success) {
      return redirect("/profile/create");
    }
    const initialData: StudentFormValues = {
      fullName: result.data.full_name,
      university: result.data.university,
      bio: result.data.bio ?? "",
      location: result.data.location,
      email: result.data.email,
    };
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-12">
        <AuthCard title="" description="">
          <StudentForm initialData={initialData} />
        </AuthCard>
      </div>
    );
  }

  if (role === "farmer") {
    const result = await getFarmerProfile();
    if (!result.success) {
      return redirect("/profile/create");
    }

    const initialData: FarmerFormValues = {
      farmName: result.data.farm_name,
      location: result.data.location,
      description: result.data.description ?? "",
      email: result.data.email,
    };
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-12">
        <AuthCard title="" description="">
          <FarmerForm initialData={initialData} />
        </AuthCard>
      </div>
    );
  }
  return redirect("/auth/signin");
}
