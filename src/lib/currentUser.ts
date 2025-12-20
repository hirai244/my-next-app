"use server";
import { cache } from "react";
import { createClient } from "./supabase/server";
export type SafeUser = {
  role: "farmer" | "student" | null;
  id: string;
};

type UserMetadata = {
  role?: "farmer" | "student";
};
export const currentUser = cache(async (): Promise<SafeUser | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  const metadata = user.user_metadata as UserMetadata;
  const role = metadata.role;
  return {
    role: role || null,
    id: user.id,
  };
});
