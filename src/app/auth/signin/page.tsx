import React from "react";
import { SignInForm } from "./SignInForm";
import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await currentUser();

  if (user) {
    const role = user.user_metadata.role;
    if (role === "farmer") {
      redirect("/job/dashboard");
    } else {
      redirect("/job/list");
    }
  }
  return (
    <div>
      <SignInForm />
    </div>
  );
}
