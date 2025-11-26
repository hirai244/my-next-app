import { PREFECTURE_NAMES } from "@/constants/prefectures";
import { Tables } from "@/src/lib/supabase";
import z from "zod";

export type JobRow = Tables<"jobs">;
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
    // date: z.coerce.date({
    //   message: "日付は必須です。",
    // }),
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
  .refine(
    (data) => {
      if (!data.start || !data.end) return true;

      const [startH, startM] = data.start.split(":").map(Number);
      const [endH, endM] = data.end.split(":").map(Number);

      const totalStartMinutes = startH * 60 + startM;
      const totalEndMinutes = endH * 60 + endM;
      return totalStartMinutes < totalEndMinutes;
    },
    {
      message: "終了時刻は開始時刻よりも後の時刻でなければなりません。",
      path: ["end"],
    }
  )
  .refine((data) => data.date !== null, {
    message: "日付は必須です。",
    path: ["date"],
  })
  .refine(
    (data) => {
      if (data.range === null) return false;
      return data.range.from !== null && data.range.to !== null;
    },
    {
      message: "開始日と終了日の両方を選択してください。",
      path: ["range"],
    }
  );
export type JobCreateValues = z.infer<typeof jobSchema>;

export type GetJobsResult =
  | {
      success: true;
      data: JobRow[];
    }
  | {
      success: false;
      message: string;
    };

export type GetJobResult =
  | {
      success: true;
      data: JobRow;
    }
  | {
      success: false;
      message: string;
    };

export type jobWithStatus = JobRow & {
  isApplied: boolean;
};
export type GetJobsWithAppliedResult =
  | {
      success: true;
      data: jobWithStatus[];
    }
  | {
      success: false;
      message: string;
    };
