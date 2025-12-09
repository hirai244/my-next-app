import { PREFECTURE_NAMES } from "@/src/constants/prefectures";
import z from "zod";

export const imageFileSchema = z.custom<FileList | File | undefined | null>(
  (val) => {
    const isServer = typeof FileList === "undefined";
    if (isServer) {
      return val === undefined || val === null || val instanceof Object;
    }
    return (
      val instanceof FileList ||
      val instanceof File ||
      val === undefined ||
      val === null
    );
  },
  {
    message: "画像ファイルを添付してください。",
  }
);

export const jobSchema = z
  .object({
    title: z.string().min(5, "タイトルは5文字以上です。"),
    email: z
      .string()
      .email({ message: "有効なメールアドレスを入力してください。" }),
    date: z.coerce.date({ message: "日付は必須です。" }).nullable(),
    start: z.string().regex(/^\d{2}:\d{2}$/, "開始時刻は必須です。"),
    end: z.string().regex(/^\d{2}:\d{2}$/, "終了時刻は必須です。"),
    range: z.object({
      from: z.coerce.date().nullable(),
      to: z.coerce.date().nullable(),
    }),
    member: z.coerce.number().min(1, "最低1人は必要です").default(1),
    zipCode: z
      .string()
      .regex(/^\d{7}$/, "ハイフンなしの7桁で入力してください。"),
    prefecture: z.enum(PREFECTURE_NAMES as [string, ...string[]], {
      message: "所在地を選択してください。",
    }),
    city: z.string().min(1, "市区町村は必須です。"),
    addressLine1: z.string().min(1, "番地,建物名は必須です。"),
    workDetails: z.string().min(20, ""),
    photoUrl: z
      .string()
      .url("有効なURLを入力してください")
      .optional()
      .nullable(),
    notes: z.string().optional(),
    jobImage: imageFileSchema,
  })
  .refine((data) => data.date !== null, {
    message: "作業日を入力してください。",
    path: ["date"],
  })
  .refine(
    (data) => {
      if (!data.range || !data.range.from || !data.range.to) return false;
      return true;
    },
    { message: "募集期間（開始・終了）を設定してください。", path: ["range"] }
  )
  .refine(
    (data) => {
      if (!data.date || !data.range?.to) return true;
      return data.range.to <= data.date;
    },
    {
      message: "募集終了日は、作業日と同じかそれより前に設定してください。",
      path: ["range"],
    }
  );
export type JobCreateValues = z.infer<typeof jobSchema>;
