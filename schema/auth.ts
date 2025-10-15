import { data } from "framer-motion/client";
import { isStrongPassword } from "validator";
import z, { email } from "zod";

const passwordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  pointsForContaining: 0,
};

export const signupSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().superRefine((data, ctx) => {
    if (!isStrongPassword(data, passwordOptions)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "大文字を含む半角英数字と記号を含めてください。",
      });
      return;
    }
  }),
  role: z.enum(["farmer", "student"], {
    message: "選択してください",
  }),
});
export type SignupFormValues = z.infer<typeof signupSchema>;

//ログイン用のスキーマ

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().superRefine((data, ctx) => {
    if (!isStrongPassword(data, passwordOptions)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "大文字を含む半角英数字と記号を含めてください。",
      });
    }
  }),
});

export type AuthFormValues = z.infer<typeof authSchema>;

//パスワードリセットのためのメール送信用のスキーマ
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
