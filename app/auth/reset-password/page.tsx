import { ResetPassword } from "@/app/auth/reset-password/ResetPassword";
import AnimatePageWrapper from "@/components/motion/AnimatePageWrapper";

export default function Page() {
  return (
    <div>
      <AnimatePageWrapper>
        <ResetPassword />
      </AnimatePageWrapper>
    </div>
  );
}
