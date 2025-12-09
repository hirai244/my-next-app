"use server";
import { cache } from "react";
import { createClient } from "./supabase/server";
type safeUser = {
  role: "farmer" | "student" | null;
  id: string;
};
export const currentUser = cache(async (): Promise<safeUser | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  const role = user.user_metadata?.role;
  const safeRole = role === "farmer" || role === "student" ? role : null;
  return {
    role: safeRole,
    id: user.id,
  };
});
