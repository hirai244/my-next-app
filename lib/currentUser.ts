"use server";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

// 認証　ログインしてるか
export const currentUser = cache(async () => {
  const supabase = await createClient();
  const {
    // 帰ってくるデータ
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
