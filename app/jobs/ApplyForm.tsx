"use client";

import { Button } from "@/components/ui/button";
import { applyJob } from "@/lib/applicationActions";
import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full py-3 bg-red-500 text-white text-lg font-bold rounded-lg hover:bg-red-600 transition disabled:bg-red-300"
    >
      {pending ? "応募処理中..." : "応募する！"}
    </Button>
  );
}

export function ApplyForm({ jobId }: { jobId: string }) {
  const applyAction = applyJob.bind(null, parseInt(jobId, 10));

  const [state, formAction] = useActionState(applyAction, {
    success: true,
    message: "",
  });
  return (
    <form action={formAction} className="w-full">
      {state.success && (
        <p
          className={
            "p-2 text-center text-sm ${state.success ? text-green-700 : text-red-700}"
          }
        >
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
