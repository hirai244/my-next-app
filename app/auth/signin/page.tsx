import React from "react";
import SignInForm from "@/components/auth/SignInForm";
import AnimatePageWrapper from "@/components/motion/AnimatePageWrapper";

export default function SignIn() {
  return (
    <div>
      <AnimatePageWrapper>
        <SignInForm />
      </AnimatePageWrapper>
    </div>
  );
}
