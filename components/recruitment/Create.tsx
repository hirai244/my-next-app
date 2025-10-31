"use client";
import { FormField } from "../forms/FormField";
import { useForm } from "react-hook-form";
import { Accordion } from "../ui/accordion";
import { AccordionForm } from "../AccordionForm";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { RBBCard } from "./RBBCard";

export function Create() {
  const form = useForm();

  const onsubmit = () => {
    console.log(form.getValues());
  };

  //   const errors = form.formState.errors;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)}>
        <RBBCard title="" description="">
          <Accordion type="multiple" defaultValue={["basic"]}>
            <AccordionForm
              title="募集の見出しと期間"
              value="basic"
              hasError={!!form.formState.errors.duration_start}
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
                    defaultValue="10:30:00"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    form={form}
                    name="end"
                    label="終了時間"
                    type="time"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    defaultValue="10:30:00"
                  />
                </div>
              </div>
            </AccordionForm>
            <AccordionForm title="期間と募集人数" value="detail">
              <FormField
                form={form}
                name="date-range"
                label="募集期間"
                type="range-picker"
              />
              <FormField
                form={form}
                name="member"
                label="募集人数"
                type="number"
                defaultValue="1"
                unit="人"
                className="w-24 text-center"
              />

              {/* <FormField
                form={form}
                name="member"
                label=""
                type="text"
                //　住所
              />
              <FormField
                form={form}
                name="member"
                label=""
                type="text"
                placeholder=""
                //　持ち物
              /> */}
            </AccordionForm>
            <AccordionForm title="作業内容" value="">
              <FormField
                form={form}
                name="detail"
                label="詳細な作業内容"
                type="textarea"
                // 作業内容
                //  住所、注意事項、詳細、持ち物、写真
              />
              <FormField
                form={form}
                name="detail"
                label="注意事項"
                type="textarea"
                // 注意事項
              />
            </AccordionForm>
            <AccordionForm title="作業内容" value="">
              <FormField
                form={form}
                name="detail"
                label="詳細な作業内容"
                type="textarea"
                // 写真
              />
            </AccordionForm>
          </Accordion>

          <Button type="submit" className="">
            送信
          </Button>
        </RBBCard>
      </form>
    </Form>
  );
}
