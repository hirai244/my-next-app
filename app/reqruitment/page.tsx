import { RecruitmentList } from "@/components/recruitment/RecruitmentList";
import { currentUser } from "@/lib/currentUser";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function () {
  const user = await currentUser();
  const supabase = await createClient();

  if (!user) return redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // if(profile?.role !== "farmer") {
  //     return redirect("/");
  // }

  return <RecruitmentList />;
}
