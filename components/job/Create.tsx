"use client";
import { FormField } from "../forms/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Accordion } from "../ui/accordion";
import { AccordionForm } from "../AccordionForm";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { JobCard } from "./JobCard";
import { AddressAutoComplete } from "../AddressAutoComplete";
import { PrefectureScroll } from "../PrefectureScroll";
import { JobCreateValues, jobSchema } from "@/schema/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJob } from "@/lib/jobActions";
import { toast } from "sonner";

export function Create() {
  const form = useForm<JobCreateValues>({
    resolver: zodResolver(jobSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      date: new Date(),
      start: "09:00",
      end: "17:00",
      zipCode: "",
      prefecture: "",
      city: "",
      addressLine1: "",
      // member: 1,
      work_details: "",
      range: {
        from: new Date(),
        to: new Date(),
      },
      notes: "",
    } as JobCreateValues,
  });

  AddressAutoComplete(form);

  const onsubmit: SubmitHandler<JobCreateValues> = async (
    data: JobCreateValues
  ) => {
    const result = await createJob(data);
    if (result.success) {
      toast.success("成功", { description: "ご登録ありがとうございます" });
    } else {
      toast.error(result.message);
    }
  };

  //   const errors = form.formState.errors;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)}>
        <JobCard title="" description="">
          <Accordion type="multiple" defaultValue={["basic"]}>
            <AccordionForm
              title="募集の見出しと期間"
              value="basic"
              hasError={
                !!form.formState.errors.date || !!form.formState.errors.start
              }
            >
              <FormField
                form={form}
                name="title"
                label="タイトル"
                placeholder="未経験者も歓迎！稲の収穫作業"
                type="text"
                description="募集する際のタイトルを決めてください。"
              />
              <div>
                <FormField
                  form={form}
                  name="date"
                  label="募集日時"
                  type="date-picker"
                />
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex flex-col gap-3">
                  <FormField
                    form={form}
                    name="start"
                    label="開始時間"
                    type="time"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    form={form}
                    name="end"
                    label="終了時間"
                    type="time"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
            </AccordionForm>
            <AccordionForm title="期間と募集人数" value="member-range">
              <FormField
                form={form}
                name="range"
                label="募集期間"
                type="range-picker"
              />
              {/* <FormField
                form={form}
                name="member"
                label="募集人数"
                type="number"
                unit="人"
                className="w-24 text-center"
              /> */}
            </AccordionForm>
            <AccordionForm title="作業場所" value="location">
              <FormField
                form={form}
                name="zipCode"
                label="郵便番号"
                type="text"
                description="ハイフンなしの7桁で入力してください。"
                className="w-1/2"
              />
              <FormField form={form} name="prefecture" label="都道府県">
                <PrefectureScroll
                  form={form}
                  name="prefecture"
                  title="都道府県"
                  placeholder="都道府県を選択してください"
                />
              </FormField>
              <FormField
                form={form}
                name="city"
                label="市町村"
                type="text"
                // disabled={true}
              />
              <FormField
                form={form}
                name="addressLine1"
                label="番地・建物名"
                type="text"
              />
            </AccordionForm>
            <AccordionForm title="作業内容" value="detail">
              <FormField
                form={form}
                name="work_details"
                label="詳細な作業内容 (必須)"
                type="textarea"
                className=""
                placeholder="例: 午前中はイチゴの収穫、午後はパック詰めを行います。"
              />
              <FormField
                form={form}
                name="notes"
                label="注意事項"
                type="textarea"
              />
              {/* 持ち物 */}
            </AccordionForm>
            {/* <AccordionForm title="写真" value="photo">
              <FormField
                form={form}
                name="detail"
                label="詳細な作業内容"
                type="textarea"
                // 写真
              />
            </AccordionForm> */}
          </Accordion>

          <Button type="submit" className="">
            送信
          </Button>
        </JobCard>
      </form>
    </Form>
  );
}
