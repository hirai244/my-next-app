import { z } from "zod";

export const roleSelectionSchema = z.object({
  role: z.enum(["farmer", "student"], {
    message: "",
  }),
});
export type RoleSelectionValues = z.infer<typeof roleSelectionSchema>;

// 農
export const farmerSchema = z.object({
  farmName: z.string().min(1, "農園名は必須です。"),
  location: z.string().min(1, "所在地は必須です。"),
  mainCrops: z.array(z.string()).optional(),
  description: z.string().optional(),
});
export type FarmerFormValues = z.infer<typeof farmerSchema>;

// 学
export const studentSchema = z.object({
  university: z.string().min(1, "大学名は必須です。"),
  major: z.string().min(1, "学部・専攻は必須です。"),
  researchTopic: z.string().optional(),
  bio: z.string().optional(),
});
export type StudentFormValues = z.infer<typeof studentSchema>;

export const profileSetupSchema = z
  .object({
    // 共通フィールド
    role: z.enum(["farmer", "student"], {
      message: "",
    }),
    farmName: z.string().optional(),
    location: z.string().optional(),
    mainCrops: z.array(z.string()).optional(),
    description: z.string().optional(),

    university: z.string().optional(),
    major: z.string().optional(),
    researchTopic: z.string().optional(),
    bio: z.string().optional(),
  })

  .superRefine((data, ctx) => {
    if (data.role === "farmer") {
      if (!data.farmName || data.farmName.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "農園名は必須です。",
          path: ["farmName"],
        });
      }
      if (!data.location || data.location.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "所在地は必須です。",
          path: ["location"],
        });
      }
    } else if (data.role === "student") {
      if (!data.university || data.university.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "大学名は必須です。",
          path: ["university"],
        });
      }
      if (!data.major || data.major.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "学部・専攻は必須です。",
          path: ["major"],
        });
      }
    }
  });

export type ProfileFormValues = z.infer<typeof profileSetupSchema>;

export type ActionResult =
  | { success: true }
  | { success: false; message: string };
