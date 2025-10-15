import SignUpForm from "@/components/auth/SignUpForm";
import AnimatePageWrapper from "@/components/motion/AnimatePageWrapper";
import React from "react";

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
