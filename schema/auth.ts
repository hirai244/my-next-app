import { isStrongPassword } from "validator";
import { z } from "zod";

const passwordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  pointsForContaining: 0,
};

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().superRefine((data, ctx) => {
    if (!isStrongPassword(data, passwordOptions)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "8文字以上で大文字を含む半角英数字と記号を含めてください。",
      });
      return;
    }
  }),
  role: z.enum(["farmer", "student"], {
    required_error: "登録タイプを選択してください。",
  }),
});
export type AuthFormValues = z.infer<typeof authSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().superRefine((data, ctx) => {
    if (!isStrongPassword(data, passwordOptions)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "8文字以上で大文字を含む半角英数字と記号を含めてください。",
      });
      return;
    }
  }),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

//…メールアドレス

export const emailSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
});

export type EmailFormValues = z.infer<typeof emailSchema>;

//…パスワード
export const passwordSchema = z.object({
  password: z.string().superRefine((data, ctx) => {
    if (!isStrongPassword(data, passwordOptions)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "大文字を含む半角英数字と記号を含めてください。",
      });
    }
  }),
});

export type PasswordFormValues = z.infer<typeof passwordSchema>;
