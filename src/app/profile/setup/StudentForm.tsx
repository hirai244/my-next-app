"use client";

import { useState } from "react";
import { FormField } from "@/src/components/FormField";
import { Button } from "@/src/components/ui/button";
import { Form } from "@/src/components/ui/form";
import { Spinner } from "@/src/components/ui/spinner";
import { createProfile } from "@/lib/profileActions";
import { StudentFormValues, studentSchema } from "@/src/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Camera,
  User,
  School,
  MapPin,
  Mail,
  FileText,
  Loader2,
} from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function StudentForm() {
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      university: "",
      bio: "",
      location: "",
      email: "",
    },
  });

  const onSubmit = async (data: StudentFormValues) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("university", data.university);
    formData.append("bio", data.bio || "");
    formData.append("location", data.location);
    formData.append("email", data.email);
    // 将来的にここで画像をformDataに追加します
    // if (imageFile) formData.append("avatar", imageFile);

    const result = await createProfile(formData);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("登録完了");
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          学生プロフィール作成
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          あなたの情報を入力して、農家さんとつながりましょう。
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group cursor-pointer">
              <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                <AvatarImage
                  src={imagePreview || ""}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-100">
                  <User className="w-12 h-12 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-xs text-gray-500">プロフィール写真を設定</p>
          </div> */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" /> 氏名
                </div>
                <FormField
                  form={form}
                  name="fullName"
                  label=""
                  type="text"
                  placeholder="山田 太郎"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <School className="w-4 h-4" /> 大学名
                </div>
                <FormField
                  form={form}
                  name="university"
                  label=""
                  type="text"
                  placeholder="○○大学"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
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
                <FileText className="w-4 h-4" /> 自己紹介
              </div>
              <FormField
                form={form}
                name="bio"
                label=""
                type="textarea"
                rows={4}
                placeholder="専攻や興味のある農業分野、意気込みなどを教えてください。"
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
