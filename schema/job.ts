import { PREFECTURE_NAMES } from "@/constants/prefectures";
import { Tables } from "@/src/lib/database.types";
import z from "zod";

export type JobRow = Tables<"jobs">;

const createTimeDate = (timeString: string): Date => {
  const [h, m] = timeString.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

export const jobSchema = z
  .object({
    title: z.string().min(5, "タイトルは5文字以上です。"),
    date: z.date({
      message: "日付は必須です。",
    }),
    start: z.string().regex(/^\d{2}:\d{2}$/, "開始時刻は必須です。"),
    end: z.string().regex(/^\d{2}:\d{2}$/, "終了時刻は必須です。"),
    range: z.object({
      from: z.date({
        message: "開始期間は必須です。",
      }),
      to: z.date({
        message: "終了期間は必須です。",
      }),
    }),
    // member: z.coerce
    //   .number()
    //   .int("募集人数は整数である必要があります。")
    //   .min(1, "人数は必須です"),
    zipCode: z
      .string()
      .regex(/^\d{7}$/, "ハイフンなしの7桁で入力してください。"),
    prefecture: z.enum(PREFECTURE_NAMES as [string, ...string[]], {
      message: "所在地を選択してください。",
    }),
    city: z.string().min(1, "市区町村は必須です。"),
    addressLine1: z.string().min(1, "番地,建物名は必須です。"),
    work_details: z.string().min(20, ""),
    // // bring_items: z.string().min(2, ""), //持ち物フォームを作って追加でいれられるようにする
    notes: z.string().optional(),
    // // photo:,
  })
  .refine(
    (data) => {
      if (!data.start || !data.end) {
        return true;
      }
      const startTime = createTimeDate(data.start);
      const endTime = createTimeDate(data.end);
      return startTime < endTime;
    },
    {
      message: "終了時刻は開始時刻よりも後の時刻でなければなりません。",
      path: ["end"],
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
