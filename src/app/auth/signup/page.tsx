import React from "react";
import { SignUpForm } from "./SignUpForm";
import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";

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
      <SignUpForm />
    </div>
  );
}
