"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateApplicationStatus } from "@/lib/applicationActions";
import { format } from "date-fns";
import { Badge, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export type Application = {
  id: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  student: {
    full_name: string;
    university: string;
    // avatar_url: string;
  };
};
export function ApplicantCard({ application }: { application: Application }) {
  const [isPending, startTransition] = useTransition();

  const applicationId = application.id;

  const handleStatusChange = (newStatus: "accepted" | "rejected") => {
    startTransition(async () => {
      const result = await updateApplicationStatus(applicationId, newStatus);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <Card className="p-5 flex flex-col sm:flex-row items-start bg-white shadow-sm border border-gray-100 gap-5">
      {/* <Avatar className="w-14 h-14 border">
        <AvatarImage src={application.student?.avatar_url || ""} />
        <AvatarFallback>
          {application.student?.full_name?.[0] || "学"}
        </AvatarFallback>
      </Avatar> */}
      <div className="flex-1 space-y-2 w-full">
        <div className="flex justify-between items">
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              {application.student?.full_name || "kkkk"}
            </h3>
            <p className="text-sm text-green-600 font-medium">
              {application.student?.university || "aaa"}
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {format(new Date(application.created_at), "MM/dd/yyyy")}
          </span>
        </div>

        <div>{application.message}</div>

        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
          {application.status === "pending" ? (
            <>
              <Button
                variant="outline"
                onClick={() => handleStatusChange("rejected")}
                disabled={isPending}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                お断り
              </Button>
              <Button
                size="sm"
                onClick={() => handleStatusChange("accepted")}
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700 w-4 h-4"
              >
                {isPending ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "採用する"
                )}
              </Button>
            </>
          ) : (
            <Badge>
              {application.status === "accepted" ? "採用済み" : "不採用"}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
