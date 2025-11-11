"use client";

import { FormField } from "@/components/forms/FormField";
import { PrefectureScroll } from "@/components/PrefectureScroll";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { JobCreateValues, JobRow, jobSchema } from "@/schema/job";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function EditForm({
  initialJobData,
  jobId,
}: {
  jobId: string;
  initialJobData: JobRow;
}) {
  // const router = useRouter();

  const form = useForm<JobCreateValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: initialJobData.title || "",
      date: new Date(initialJobData.date),
      start: initialJobData.start || "",
      end: initialJobData.end || "",
      prefecture: initialJobData.prefecture || "",
      city: initialJobData.city || "",
      addressLine1: initialJobData.address_line1 || "",
      work_details: initialJobData.work_details || "",
      range: {
        from: new Date(initialJobData.range_start),
        to: new Date(initialJobData.range_end),
      },
      zipCode: initialJobData.zip_code || "",
      notes: initialJobData.notes || "",
    } as JobCreateValues,
  });

  const onsubmit = async () => {
    console.log("submit");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
        <div className="bg-white shadow-md p-6 md:p-8 rounded-xl">
          <div className="aspect-video bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
            <p>募集写真アップロードエリア</p>
          </div>
        </div>

        <Section title="📝 基本情報">
          <FormField
            label="募集タイトル"
            name="title"
            form={form}
            placeholder=""
            type="text"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              form={form}
              name="date"
              label="募集日時"
              type="date-picker"
            />
            {/* 募集人数 */}
            {/* <FormField label="募集人数" name="member" form={form} type="number" unit="名" /> */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              form={form}
              name="start"
              label="開始時間"
              type="time"
              // className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <FormField
              form={form}
              name="end"
              label="終了時間"
              type="time"
              // className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </Section>
        <Section title="📍 作業場所">
          <FormField
            form={form}
            name="zipCode"
            label="郵便番号"
            type="text"
            description="ハイフンなしの7桁で入力してください。"
            // className="w-1/2"
          />
          <FormField form={form} name="prefecture" label="都道府県">
            <PrefectureScroll
              form={form}
              name="prefecture"
              title="都道府県"
              placeholder="都道府県を選択してください"
            />
          </FormField>
          <FormField form={form} name="city" label="市町村" type="text" />
          <FormField
            form={form}
            name="addressLine1"
            label="番地・建物名"
            type="text"
          />
        </Section>
        <Section title="📝 作業内容">
          <FormField
            label="詳細"
            name="work_details"
            form={form}
            placeholder="具体的な作業内容を20文字以上で記述してください。"
            type="textarea"
            rows={5}
            className="min-h-[200px]"
          />
        </Section>
        <Section title="⚠️ その他注意事項">
          <FormField
            label="メモ"
            name="notes"
            form={form}
            placeholder="農家からの連絡事項など (任意)"
            type="textarea"
            rows={6}
          />
        </Section>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full py-3 bg-green-600 hover:bg-green-700"
          >
            {form.formState.isSubmitting ? "作成中..." : "募集を作成する"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
