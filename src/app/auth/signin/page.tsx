import React from "react";
import AnimatePageWrapper from "@/src/components/motion/AnimatePageWrapper";
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
