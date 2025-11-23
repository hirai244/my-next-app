import { PREFECTURE_NAMES } from "@/constants/prefectures";
import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
// 農
export const farmerSchema = z.object({
  farmName: z.string().min(1, "農園名は必須です。"),
  location: z.enum(PREFECTURE_NAMES as [string, ...string[]], {
    message: "所在地を選択してください。",
  }),
  description: z.string().optional(),
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
});
export type StudentFormValues = z.infer<typeof studentSchema>;
