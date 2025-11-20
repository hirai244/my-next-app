"use client";
import { FormField } from "../../../../components/forms/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../../../components/ui/form";
import { Button } from "../../../../components/ui/button";
import { useAddressAutoComplete } from "../../../../components/AddressAutoComplete";
import { JobCreateValues, jobSchema } from "@/schema/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { createJob } from "@/lib/jobActions";
import Image from "next/image";
import {
  Loader2,
  UploadCloud,
  MapPin,
  CalendarDays,
  ClipboardList,
  Info,
} from "lucide-react";

// 🎨 UIコンポーネント: セクション
type SectionProps = {
  title: string;
  icon?: React.ReactNode; // アイコンを追加
  children: React.ReactNode;
};

const Section = ({ title, icon, children }: SectionProps) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
    <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
      {icon && <div className="text-green-600">{icon}</div>}
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

export function Create() {
  const form = useForm<JobCreateValues>({
    resolver: zodResolver(jobSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      date: null,
      start: "09:00",
      end: "17:00",
      member: 1,
      zipCode: "",
      prefecture: "",
      city: "",
      addressLine1: "",
      workDetails: "",
      range: {
        from: null,
        to: null,
      },
      notes: "",
      photoUrl: undefined,
      jobImage: undefined,
    },
  });

  useAddressAutoComplete(form);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const watchedJobImage = form.watch("jobImage");

  useEffect(() => {
    if (
      typeof FileList !== "undefined" &&
      typeof File !== "undefined" &&
      watchedJobImage &&
      watchedJobImage instanceof FileList &&
      watchedJobImage.length > 0 &&
      watchedJobImage[0] instanceof File
    ) {
      const file = watchedJobImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchedJobImage]);

  const onsubmit: SubmitHandler<JobCreateValues> = async (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "jobImage" || key === "photoUrl" || key === "range") continue;
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }
    const range = data.range;
    if (range && range.from instanceof Date && range.to instanceof Date) {
      formData.append("range_start", range.from.toISOString());
      formData.append("range_end", range.to.toISOString());
    }
    if (
      typeof FileList !== "undefined" &&
      typeof File !== "undefined" &&
      data.jobImage &&
      data.jobImage instanceof FileList &&
      data.jobImage.length > 0 &&
      data.jobImage[0] instanceof File
    ) {
      formData.append("jobImage", data.jobImage[0]);
    }

    const result = await createJob(formData);
    if (result.success) {
      toast.success("成功", { description: "募集を作成しました。" });
    } else {
      toast.error(result.message);
    }
  };

  const { isSubmitting, errors } = form.formState;

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            新規募集の作成
          </h1>
          <p className="text-gray-500 mt-2">
            お手伝いしてくれる学生さんを募集しましょう
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-4">
                募集のイメージ写真
              </label>
              <div className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors cursor-pointer overflow-hidden group">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="募集写真プレビュー"
                    fill
                    className="object-cover transition-opacity group-hover:opacity-80"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                      <UploadCloud className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-sm font-medium">
                      クリックして写真をアップロード
                    </p>
                    <p className="text-xs mt-1">JPG, PNG, WEBP (最大5MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  id="jobImage"
                  {...form.register("jobImage")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept="image/*"
                />
                {imagePreview && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-0">
                    <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      写真を変更する
                    </span>
                  </div>
                )}
              </div>
              {errors.jobImage && (
                <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1">
                  <Info className="w-4 h-4" />{" "}
                  {errors.jobImage.message as string}
                </p>
              )}
            </div>
            <Section
              title="基本情報"
              icon={<ClipboardList className="w-6 h-6" />}
            >
              <FormField
                label="募集タイトル"
                name="title"
                form={form}
                placeholder="例: 収穫をお手伝いしてください！"
                type="text"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  form={form}
                  name="date"
                  label="募集日時"
                  type="date-picker"
                  placeholder="日付を選択"
                />
                <FormField
                  form={form}
                  name="member"
                  label="募集人数"
                  type="number"
                  placeholder="例: 2"
                  unit="人"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  form={form}
                  name="start"
                  label="開始時間"
                  type="time"
                />
                <FormField
                  form={form}
                  name="end"
                  label="終了時間"
                  type="time"
                />
              </div>
            </Section>

            <Section
              title="募集期間"
              icon={<CalendarDays className="w-6 h-6" />}
            >
              <FormField
                form={form}
                name="range"
                label="募集期間"
                type="range-picker"
              />
            </Section>

            <Section title="作業場所" icon={<MapPin className="w-6 h-6" />}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <FormField
                    form={form}
                    name="zipCode"
                    label="郵便番号"
                    type="text"
                    placeholder="1234567"
                    description="ハイフンなし"
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="都道府県"
                    name="prefecture"
                    form={form}
                    type="prefecture"
                    placeholder="都道府県を選択"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  form={form}
                  name="city"
                  label="市区町村"
                  type="text"
                  placeholder="例: ○○市"
                />
                <FormField
                  form={form}
                  name="addressLine1"
                  label="番地・建物名"
                  type="text"
                  placeholder="例: 1-2-3 ○○農園"
                />
              </div>
            </Section>

            <Section title="詳細情報" icon={<Info className="w-6 h-6" />}>
              <FormField
                label="作業内容の詳細"
                name="workDetails"
                form={form}
                placeholder="具体的な作業内容、持ち物、服装などを20文字以上で詳しく記述してください。"
                type="textarea"
                rows={6}
              />
              <FormField
                label="メモ・連絡事項 (任意)"
                name="notes"
                form={form}
                placeholder="雨天時の対応や、集合場所の注意点などがあれば記入してください。"
                type="textarea"
                rows={4}
              />
            </Section>

            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-50 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="max-w-3xl mx-auto">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed rounded-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin w-5 h-5" /> 作成中...
                    </span>
                  ) : (
                    "募集を作成して公開する"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
