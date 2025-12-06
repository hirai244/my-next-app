"use client";

import { FormField } from "@/src/components/FormField";
import { Button } from "@/src/components/ui/button";
import { Form } from "@/src/components/ui/form";
import { Spinner } from "@/src/components/ui/spinner";
import { createProfile } from "@/lib/profileActions";
import { FarmerFormValues, farmerSchema } from "@/src/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Mail, MapPin, School, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function FarmerForm() {
  const form = useForm<FarmerFormValues>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      farmName: "",
      location: "",
      description: "",
      email: "",
    },
  });
  const onSubmit = async (data: FarmerFormValues) => {
    const formData = new FormData();
    formData.append("farmName", data.farmName);
    formData.append("location", data.location);
    formData.append("description", data.description || "");
    formData.append("email", data.email);

    const result = await createProfile(formData);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("登録完了");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          農家プロフィール作成
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          あなたの情報を入力して、学生さんとつながりましょう。
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="w-4 h-4" /> 農園名または氏名
              </div>
              <FormField
                form={form}
                name="farmName"
                label=""
                type="text"
                placeholder="農園名または氏名を記入してください。"
              />
            </div>
            {/* </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4" /> メールアドレス
                </div>
                <FormField
                  form={form}
                  name="email"
                  label=""
                  type="email"
                  placeholder="student@example.com"
                />
              </div>

              <div className="space-y-0">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4" /> 活動エリア (都道府県)
                </div>
                <FormField
                  label=""
                  name="location"
                  form={form}
                  type="prefecture"
                  placeholder="都道府県を選択"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4" /> 紹介
              </div>
              <FormField
                form={form}
                name="description"
                label=""
                type="textarea"
                rows={4}
                placeholder="栽培している作物など、仕事の紹介をしてください。"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-5 h-5" /> 登録中...
                </span>
              ) : (
                "登録する"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
