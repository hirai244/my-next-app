"use client";
import { Button } from "@/components/ui/button";
import { applyJob } from "@/lib/applicationActions";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type ApplyButtonProps = {
  jobId: number;
  isApplied: boolean;
};

export function ApplyButton({ jobId, isApplied }: ApplyButtonProps) {
  const [isPending, startTransition] = useTransition();
  if (isApplied) {
    return (
      <Button disabled className="w-full py-6">
        応募済み
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
