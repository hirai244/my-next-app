"use client";
import { Button } from "@/components/ui/button";
import { ApplicationStatus, applyJob } from "@/lib/applicationActions";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type ApplyButtonProps = {
  jobId: number;
  currentStatus: ApplicationStatus;
};

export function ApplyButton({ jobId, currentStatus }: ApplyButtonProps) {
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
    return (
      <Button
        disabled
        className="w-full py-6 bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-50 opacity-100 cursor-default"
      >
        <CheckCircle className="mr-2 h-5 w-5" />
        選考中
      </Button>
    );
  }

  const handleApply = async () => {
    startTransition(async () => {
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
      className="bg-green-600 hover:bg-green-700"
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
