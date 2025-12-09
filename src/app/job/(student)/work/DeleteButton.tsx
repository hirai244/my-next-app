"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { deleteApplication } from "@/src/lib/applicationActions";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
type DeleteButtonProps = {
  jobId: number;
  isDetailView?: boolean;
};

export default function DeleteButton({
  jobId,
  isDetailView = false,
}: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteApplication(jobId);
      if (result.success) {
        toast.success(result.message);
        if (isDetailView) {
          router.push("/job/dashboard");
        }
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          辞退
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に辞退しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません。応募データと関連するすべての情報が完全に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 辞退中...
              </>
            ) : (
              "辞退する"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
