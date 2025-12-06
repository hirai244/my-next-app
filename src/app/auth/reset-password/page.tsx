import { ResetPassword } from "@/src/app/auth/reset-password/ResetPassword";
import AnimatePageWrapper from "@/src/components/motion/AnimatePageWrapper";

export default function Page() {
  return (
    <div>
      <AnimatePageWrapper>
        <ResetPassword />
      </AnimatePageWrapper>
    </div>
  );
}
