//import { isStrongPassword } from "validator";
import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().min(8, { message: "最小8文字以上です。" }),
  //.refine(isStrongPassword, {
  //message: "大文字を含む半角英数字と記号を含めてください。",}),
});

export type AuthFormValues = z.infer<typeof authSchema>;
