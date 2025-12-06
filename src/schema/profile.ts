import { PREFECTURE_NAMES } from "@/src/constants/prefectures";
import { z } from "zod";
import { emailSchema } from "./auth";
// 農
export const farmerSchema = z.object({
  farmName: z.string().min(1, "農園名は必須です。"),
  location: z.enum(PREFECTURE_NAMES as [string, ...string[]], {
    message: "所在地を選択してください。",
  }),
  description: z.string().optional(),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
});
export type FarmerFormValues = z.infer<typeof farmerSchema>;

// 学
export const studentSchema = z.object({
  fullName: z.string().min(1, "氏名は必須です。"),
  university: z.string().min(1, "大学名は必須です。"),
  location: z.enum(PREFECTURE_NAMES as [string, ...string[]], {
    message: "所在地を選択してください。",
  }),
  bio: z.string().optional(),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
});
export type StudentFormValues = z.infer<typeof studentSchema>;
