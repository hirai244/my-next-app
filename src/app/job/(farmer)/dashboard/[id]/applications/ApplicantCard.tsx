"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { updateApplicationStatus } from "@/src/lib/applicationActions";
import { format } from "date-fns";
import { Loader2, User, CheckCircle2, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
export type Application = {
  id: number;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  created_at: string;
  student: {
    full_name: string | null;
    university: string | null;
  } | null;
};

export function ApplicantCard({ application }: { application: Application }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: "accepted" | "rejected") => {
    startTransition(async () => {
      const result = await updateApplicationStatus(application.id, newStatus);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card className="p-5 flex flex-col gap-4 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 leading-tight">
              {application.student?.full_name || "名無し"}
            </h3>
            <p className="text-sm text-green-600 font-medium">
              {application.student?.university || "所属なし"}
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {format(new Date(application.created_at), "yyyy/MM/dd")}
        </span>
      </div>
      {/* <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
        {application.message || "（メッセージなし）"}
      </div> */}
      <div className="flex justify-end pt-2 border-t border-gray-50">
        {application.status === "pending" ? (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => handleStatusChange("rejected")}
              disabled={isPending}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              お断り
            </Button>
            <Button
              onClick={() => handleStatusChange("accepted")}
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700 text-white min-w-[100px]"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              )}
              {isPending ? "更新中" : "採用する"}
            </Button>
          </div>
        ) : (
          <Badge
            variant={
              application.status === "accepted" ? "default" : "destructive"
            }
            className={`px-3 py-1 text-sm ${
              application.status === "accepted"
                ? "bg-green-600 hover:bg-green-600"
                : ""
            }`}
          >
            {application.status === "accepted" ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 採用済み
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <XCircle className="w-4 h-4" /> 不採用
              </span>
            )}
          </Badge>
        )}
      </div>
    </Card>
  );
}
