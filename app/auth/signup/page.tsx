import AnimatePageWrapper from "@/components/motion/AnimatePageWrapper";
import React from "react";
import { SignUpForm } from "./SignUpForm";

const page = () => {
  return (
    <div>
      <AnimatePageWrapper>
        <SignUpForm />
      </AnimatePageWrapper>
    </div>
  );
};

export default page;
