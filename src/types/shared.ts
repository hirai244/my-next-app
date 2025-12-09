import { Tables } from "./supabase";

export type ActionResult =
  | { success: true; message?: string; redirectUrl?: string }
  | { success: false; message?: string; redirectUrl?: string };

export type JobRow = Tables<"jobs">;

export type GetJobsResult =
  | {
      success: true;
      data: JobRow[];
    }
  | {
      success: false;
      message: string;
    };
