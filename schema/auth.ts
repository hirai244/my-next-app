import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください" }),
});

export type AuthFormValues = z.infer<typeof authSchema>;
