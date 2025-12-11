"use client";
import { Button } from "@/src/components/ui/button";
import { ApplicationStatus, applyJob } from "@/src/lib/applicationActions";
import { currentUser } from "@/src/lib/currentUser";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import DeleteButton from "../../work/DeleteButton";

type ApplyButtonProps = {
  jobId: number;
  currentStatus: ApplicationStatus;
  className?: string;
};

export function ApplyButton({
  jobId,
  currentStatus,
  className,
}: ApplyButtonProps) {
  const [isPending, startTransition] = useTransition();

  if (currentStatus === "accepted") {
    return (
      <Button
        disabled
        className="w-full py-6 bg-green-100 text-green-700 border border-green-200 hover:bg-green-100 opacity-100 cursor-default"
      >
        <CheckCircle className="mr-2 h-5 w-5" />
        採用されました
      </Button>
    );
  }
  if (currentStatus === "rejected") {
    return (
      <Button
        disabled
        className="w-full py-6 bg-red-50 text-red-600 border border-red-100 hover:bg-red-50 opacity-100 cursor-default"
      >
        <XCircle className="mr-2 h-5 w-5" />
        不採用
      </Button>
    );
  }

  if (currentStatus === "pending") {
    return <DeleteButton jobId={jobId} isDetailView={true} />;
  }

  const handleApply = async () => {
    startTransition(async () => {
      const user = await currentUser();
      if (!user) {
        toast.error("ログインが必要です。");
        return;
      }
      if (user.role !== "student") {
        toast.error("学生のみ応募できます");
        return;
      }
      const result = await applyJob(jobId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <Button
      onClick={handleApply}
      disabled={isPending}
      className="w-full py-6 bg-green-600 text-white border hover:scale-103 transition-transform duration-500 opacity-100 cursor-default"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          応募中...
        </>
      ) : (
        "応募"
      )}
    </Button>
  );
}
