import React from "react";
import AnimatePageWrapper from "@/components/motion/AnimatePageWrapper";
import { SignInForm } from "./SignInForm";

export default function SignIn() {
  return (
    <div>
      <AnimatePageWrapper>
        <SignInForm />
      </AnimatePageWrapper>
    </div>
  );
}
