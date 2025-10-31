import { PREFECTURE_NAMES } from "@/constants/prefectures";
import { z } from "zod";

//""," "をundefinedに変換
const castToUndefined = z.preprocess(
  (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
  z.any()
);

// 役割
export const roleSelectionSchema = z.object({
  role: z.enum(["farmer", "student"], {
    message: "選択してください",
  }),
});
export type RoleSelectionValues = z.infer<typeof roleSelectionSchema>;

// 農
export const farmerSchema = z.object({
  farmName: z.string().min(1, "農園名は必須です。"),
  location: z.enum(PREFECTURE_NAMES as [string, ...string[]], {
    message: "所在地を選択してください。",
  }),
  // mainCrops: z.array(z.string()).optional(),
  // description: z.string().optional(),
});
export type FarmerFormValues = z.infer<typeof farmerSchema>;

// 学
export const studentSchema = z.object({
  university: z.string().min(1, "大学名は必須です。"),
  major: z.string().min(1, "学部・専攻は必須です。"),
  bio: z.string().optional(),
});
export type StudentFormValues = z.infer<typeof studentSchema>;

export const profileSetupSchema = z.discriminatedUnion("role", [
  z.object({
    role: z.literal("farmer"),
    farmName: z.string().min(1, "農園名は必須です。"),
    location: z.enum(PREFECTURE_NAMES as [string, ...string[]], {
      message: "所在地を選択してください。",
    }),
    university: z.string().optional(),
    major: z.string().optional(),
    bio: z.string().optional(),
  }),
  z.object({
    role: z.literal("student"),
    university: z.string().min(1, "大学名は必須です。"),
    major: z.string().min(1, "学部・専攻は必須です。"),
    bio: z.string().optional(),
  }),
]);

export type ProfileFormValues = z.infer<typeof profileSetupSchema>;

export type ActionResult =
  | { success: true }
  | { success: false; message: string };
